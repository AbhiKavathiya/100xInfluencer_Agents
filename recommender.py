import pandas as pd
import numpy as np
import faiss

# class InfluencerRecommender:
#     def __init__(self, data_path):
#         self.df = self.load_and_clean_data(data_path)
#         self.feature_cols = ['Age', 'YouTube Subscribers', 'Instagram Followers', 'Engagement Rate']
#         self.entire_mean = self.df[self.feature_cols].mean()
#         self.entire_std = self.df[self.feature_cols].std()
#         self.normalized_features = self.normalize_features(self.df[self.feature_cols])
#         self.index = self.build_faiss_index()

class InfluencerRecommender:
    def __init__(self, data_path):
        self.feature_cols = ['Age', 'YouTube Subscribers', 'Instagram Followers',
                             'Engagement Rate']  # Moved here first
        self.df = self.load_and_clean_data(data_path)
        self.entire_mean = self.df[self.feature_cols].mean()
        self.entire_std = self.df[self.feature_cols].std()
        self.normalized_features = self.normalize_features(self.df[self.feature_cols])
        self.index = self.build_faiss_index()

    def load_and_clean_data(self, data_path):
        df = pd.read_excel(data_path)
        for col in ['YouTube Subscribers', 'Instagram Followers']:
            df[col] = df[col].apply(self.convert_to_numeric)
        df['Engagement Rate'] = pd.to_numeric(df['Engagement Rate'], errors='coerce')
        df.fillna({col: 0 for col in self.feature_cols}, inplace=True)
        return df

    def convert_to_numeric(self, val):
        if isinstance(val, str):
            val = val.replace(' ', '').replace('+', '').upper()
            if 'M' in val:
                return float(val.replace('M', '')) * 1e6
            elif 'K' in val:
                return float(val.replace('K', '')) * 1e3
        try:
            return float(val)
        except:
            return 0.0

    def normalize_features(self, features):
        return (features - self.entire_mean) / self.entire_std

    def build_faiss_index(self):
        features = self.normalized_features.values.astype('float32')
        index = faiss.IndexFlatL2(features.shape[1])
        index.add(features)
        return index

    def parse_query(self, query):
        criteria = {}
        if "male" in query.lower():
            criteria['gender'] = 'Male'
        if "female" in query.lower():
            criteria['gender'] = 'Female'
        target_vector = np.zeros(len(self.feature_cols))
        return criteria, target_vector

    def pre_filter(self, criteria):
        filtered_df = self.df.copy()
        if 'gender' in criteria:
            filtered_df = filtered_df[filtered_df['Gender'] == criteria['gender']]
        return filtered_df

    def recommend(self, query, k=3):
        criteria, target_vector = self.parse_query(query)
        filtered_df = self.pre_filter(criteria)
        if filtered_df.empty:
            return pd.DataFrame()

        filtered_indices = filtered_df.index.tolist()
        normalized_filtered = self.normalized_features.loc[filtered_indices].values.astype('float32')

        target_vector = target_vector.reshape(1, -1).astype('float32')
        distances, indices = self.index.search(target_vector, k=min(k, len(filtered_df)))
        result_indices = [filtered_indices[i] for i in indices[0]]
        results = self.df.loc[result_indices].copy()
        results['Similarity Score'] = 1 / (1 + distances[0])
        return results.sort_values(by='Similarity Score', ascending=False)
