import React from 'react';
import { Control, Controller } from 'react-hook-form';
import {
    TextInput
} from 'react-native';

type CapsuleResponseInputProps = {
    control: Control<{ response: string }>;
}
export const CapsuleResponseInput = ({ control }: CapsuleResponseInputProps) => {
    return (
        <Controller
            control={control}
            name="response"
            render={({ field: { onChange, value } }) => (
                <TextInput
                    style={{ backgroundColor: 'white', borderRadius: 16, padding: 32, minHeight: 100 }}
                    multiline
                    placeholder="Ne réfléchis pas trop. Écris ce qui vient, même si ce n'est pas clair."
                    value={value}
                    onChangeText={onChange}
                    numberOfLines={10}
                />
            )}
        />
    )
}