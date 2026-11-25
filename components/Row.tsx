import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export type RowProps = {
    id: string;
    description: string;
};

export const Row = ({ id, description }: RowProps) => (
    <View style={styles.row}>
        <View style={styles.textContainer}>
            <Text style={styles.id}>{id}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create(
    {
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#2a2a2a',
            borderRadius: 5,
            padding: 16,
            marginBottom: 12,
        },
        textContainer: {
            flex: 1,
            justifyContent: 'center',
        },
        id: {
            fontSize: 18,
            fontWeight: '600'
        },
        description: {
            fontSize: 14,
            color: '#555',
        },
    }
);