import mitt from 'mitt'
import { DialogType } from "@/components/Dialog.vue";

type Events = {
    dialog: DialogEventData,
    dialog_result: boolean
}

export interface DialogEventData {
    type: DialogType,
    title: string;
    message: string;
    confirm: string;
    cancel: string;
}

export const events = mitt<Events>()

export function alert(title: string, message: string) {
    events.emit('dialog', {
        type: 'alert',
        title, message,
        confirm: 'Okay',
        cancel: '',
    })
}

export async function confirm(title: string, message: string, confirm: string = 'Confirm', cancel: string = 'Cancel'): Promise<boolean> {
    return new Promise(resolve => {
        events.emit('dialog', {
            type: 'confirm',
            title, message,
            confirm, cancel
        });
        events.on('dialog_result', resolve)
    })
}