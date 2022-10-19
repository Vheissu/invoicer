import { valueConverter } from "aurelia";

@valueConverter('date')
export class DateConverter {
    fromView(value) {
        return value;
    }

    toView(value) {
        if (!value) {
            return value;
        }

        const formatter = new Intl.DateTimeFormat(navigator.language, {
            dateStyle: 'short'
        });

        return formatter.format(value);
    }
}
