class Abbreviation {    
    getAddress(data) {
        let arr = []
        
        /// Город
        if (data.city_area === null)
            arr.push(data.city)
        else
            arr.push('Москва')
    
        // АО
        arr.push(data.city_area);
    
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
