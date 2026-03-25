import { CapsuleNotificationTime } from "@/src/features/notification/hooks/use-notification-capsule";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

export type NotificationFormValues = {
    isSubscribed: boolean;
    hours: string;
    minutes: string;
}

type UseNotificationFormProps = {
    time: CapsuleNotificationTime;
    isSubscribed: boolean;
}
export const useNotificationForm = ({ time, isSubscribed }: UseNotificationFormProps): UseFormReturn<NotificationFormValues> => {

    const form = useForm<NotificationFormValues>({
        defaultValues: {
            isSubscribed,
            hours: time.hours.toString(),
            minutes: time.minutes.toString(),
        },
        mode: 'onChange',
    });

    useEffect(() => {
        form.reset({
            isSubscribed,
            hours: time.hours.toString(),
            minutes: time.minutes.toString(),
        });
    }, [isSubscribed, time]);

    return form;
}