function makeAbbreviation(data){
    if (data =='Центральный')
        return (data = 'ЦАО')
    else if (data == 'Северный')
        return (data = 'САО')
    else if (data == 'Северо-восточный')
        return (data = 'СВАО')
    else if (data == 'Восточный')
        return (data = 'ВАО')
    else if (data == 'Юго-восточный')
        return (data = 'ЮВАО')
    else if (data == 'Южный')
        return (data = 'ЮАО')
    else if (data == 'Юго-западный')
        return (data = 'ЮЗАО')
    else if (data == 'Западный')
        return (data = 'ЗАО')
    else if (data == 'Северо-западный')
        return (data = 'СЗАО')
    else if (data == 'Зеленоградский')
        return (data = 'ЗелАО')
    else if ((data == 'Новомосковский') || (data == 'Троицкий'))
        return (data = 'ТиНАО')
    else
        return data
}

class Abbreviation {    
    getAdress(data) {
        let arr = []
        
        /// Город
        if (data.city_area === null)
            arr.push(data.city)
        else
            arr.push('Москва')
    
        // АО
        arr.push(makeAbbreviation(data.city_area));
    
        // Район
        if (data.area != null) {  
            arr.push(data.area);
        } else {
            arr.push(data.city_district);
        }
    
    
        return(arr)
    }
}

module.exports = new Abbreviation()
