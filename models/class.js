class Chef {
    constructor(id, fullName, birthDate, gender, city) {
        this.id = id
        this.fullName = fullName
        this.birthDate = birthDate
        this.gender = gender
        this.city = city
    }

    get formatBirthDate() {
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        return this.birthDate.toLocaleDateString('id-ID', options)
    }
}

class ChefDetailDuration extends Chef {
    constructor(id, fullName, birthDate, gender, city, averageDuration, minDuration, maxDuration) {
        super(id, fullName, birthDate, gender, city)
        this.averageDuration = averageDuration
        this.minDuration = minDuration
        this.maxDuration = maxDuration
    }

    
}

class Recipe {
    constructor(id, name, duration, category, totalVote) {
        this.id = id
        this.name = name
        this.duration = duration
        this.category = category
        this.totalVote = totalVote
    }
}

class RecipeDetail extends Recipe {
    constructor(id, name, duration, category, totalVote, createdDate, notes, imageUrl, ChefId, chefName) {
        super(id, name, duration, category, totalVote)
        this.createdDate = createdDate
        this.notes = notes
        this.imageUrl = imageUrl
        this.ChefId = ChefId
        this.chefName = chefName
    }

    get formatCreatedDate() {
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        return this.createdDate.toLocaleDateString('id-ID', options)
    }

    get formatEditFormCreatedDate() {
        return this.createdDate.toISOString().substring(0, 10);
    }
}

module.exports = {
    Chef,
    ChefDetailDuration,
    Recipe,
    RecipeDetail
}