const getInicioMes = (data = new Date()) => {    
    return new Date(data.getFullYear(), data.getMonth(), 1);
}

const getFinalMes = (data = new Date()) => {    
    let dataLocal = data;
    
    if (dataLocal.getMonth() === 11) {
        dataLocal.setFullYear(dataLocal.getFullYear() + 1);
        dataLocal.setMonth(0); 
    } else {
        dataLocal.setMonth(dataLocal.getMonth() + 1);
    }

    return getInicioMes(dataLocal) - 1;
}

const getDecMes = (data = new Date()) => {    
    let dataLocal = data;

    if (dataLocal.getMonth() === 0) {
        dataLocal.setFullYear(dataLocal.getFullYear() - 1);
        dataLocal.setMonth(11); 
    } else {
        dataLocal.setMonth(dataLocal.getMonth() - 1);
    }

    return dataLocal;
}

const getIncMes = (data = new Date()) => {    
    let dataLocal = data;

    if (dataLocal.getMonth() === 11) {
        dataLocal.setFullYear(dataLocal.getFullYear() + 1);
        dataLocal.setMonth(0); 
    } else {
        dataLocal.setMonth(dataLocal.getMonth() + 1);
    }

    return dataLocal;
}

const getDateJson = (data = new Date()) => {
    return String(data.getFullYear()).padStart(4, "0")
        + "-" + String(data.getMonth() + 1).padStart(2, "0")
        + "-" + String(data.getDate()).padStart(2, "0");
}

const getTimeJson = (data = new Date()) => {
    return String(data.getHours()).padStart(2, "0")
        + ":" + String(data.getMinutes()).padStart(2, "0")
        + ":" + String(data.getSeconds()).padStart(2, "0");
}

const getDateTimeJson = (data = new Date()) => {
    return getDateJson(data) + " " + getTimeJson(data);
}

export {
    getInicioMes,
    getFinalMes,
    getDateJson,
    getDateTimeJson,
    getTimeJson,
    getDecMes,
    getIncMes
}