class formatUtils {
    formatDateAnsi(date) {
        const data = new Intl.DateTimeFormat('en-GB').format(date);
        //22/07/2020
        //012345678901234567890123
        //          1         2
        return data.substring(6, 10)
            + "-" + data.substring(3, 5)
            + "-" + data.substring(0, 2);
    }

    formatDateTimeUnique(date) {
        const data = new Intl.DateTimeFormat('en-GB').format(date);
        return data.substring(6, 10)
            + data.substring(3, 5)
            + data.substring(0, 2)
            + data.substring(11, 13)
            + data.substring(14, 16)
            + data.substring(17, 19);
    }

    formatDate(date) {
        if (date === null) return "";
        //2019-07-22T00:29:05.000Z
        //012345678901234567890123
        //          1         2
        return String(date).substring(8, 10)
            + "/" + String(date).substring(5, 7)
            + "/" + String(date).substring(0, 4);
    }

    formatTime(date) {
        if (date === null) return "";
        return String(date).substring(11, 16);
    }

    formatDateTime(date) {
        if (date === null) return "";
        return this.formatDate(date) + " " + this.formatTime(date);
    }

    formatCPF_CNPJ(text){
        if (String(text).length === 11) {
            return text.substring(0, 3)
                + "." + text.substring(3, 6)
                + "." + text.substring(6, 9)
                + "-" + text.substring(9, 11);
        }

        if (String(text).length === 14) {
            return text.substring(0, 2)
                + "." + text.substring(2, 5)
                + "." + text.substring(5, 8)
                + "/" + text.substring(8, 12)
                + "-" + text.substring(12, 14);
        }

        return text;
    }

    formatValor(text, decimal = 2) {
        return String(parseFloat(text).toFixed(decimal)).replace(".", ',');
    }
}

export default new formatUtils();