class MedicDataModel {
    medicId!: number
    name!: string
    lastname!: string
    credentials!: any[]
    licenses!: any[]
    email!: string
    age!: number
    gender!: string
}

const dataModel = new MedicDataModel()
dataModel.medicId = 100
dataModel.name = "Javier"
dataModel.lastname = "Pardo"
dataModel.credentials = [
    {
        specialtyId: 2001,
        subSubspecialtyId: 126
    }
]
dataModel.licenses = [
    {
        countryISO: "PE",
        id: "cmp-2345"
    }
]
dataModel.email = "javier.pardo@gmail.com"
dataModel.age = 34
dataModel.gender = "male"

console.log(dataModel)