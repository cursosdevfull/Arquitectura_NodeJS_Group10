type CREDENTIALS = {
    specialtyId: number
    subSpecialtyId: number
}

type COUNTRY = "PE" | "MX" | "CO" | "CL"

type LICENSE = {
    country: COUNTRY,
    id: string
}

type GENDER = "male" | "female"

class MedicDomainModel {
    private readonly medicId: number
    private name: string
    private lastname: string
    private credentials: CREDENTIALS[]
    private licenses: LICENSE[]
    private email: string
    private age: number
    private gender: GENDER

    constructor(name: string, lastname: string, credentials: CREDENTIALS[], licenses: LICENSE[], email: string, age: number, gender: GENDER) {
        if (name.length < 3) throw new Error("Name must have 3 characters at least")
        if (lastname.length < 3) throw new Error("Lastname must have 3 characters at least")

        if (credentials.length === 0) throw new Error("The credentials should have one item at least")
        for (const credential of credentials) {
            if (credential.specialtyId <= 0 || credential.subSpecialtyId <= 0) throw new Error("Neither the specialtyId nor the subSpecialtyId should be less than or equal to zero")
        }

        if (licenses.length === 0) throw new Error("The licenses should have one item at least")
        for (const license of licenses) {
            if (license.id.length < 5) throw new Error("Id should have 3 characters at least")
        }

        const isEmailValid = email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i)
        if (!isEmailValid) throw new Error("Invalid email")

        if (age < 18 || age > 100) throw new Error("The age must be in the range between 18 and 100")

        this.medicId = 5000
        this.name = name
        this.lastname = lastname
        this.credentials = credentials
        this.licenses = licenses
        this.email = email
        this.age = age
        this.gender = gender
    }

    properties() {
        return {
            medicId: this.medicId,
            name: this.name,
            lastname: this.lastname,
            credentials: this.credentials,
            licenses: this.licenses,
            email: this.email,
            age: this.age,
            gender: this.gender
        }
    }
}

const domainModel = new MedicDomainModel(
    "Marta",
    "Maúrtua",
    [{ specialtyId: 10, subSpecialtyId: 20 }],
    [{ country: "PE", id: "abc-1234" }],
    "martha@gmail.com",
    54,
    "female"
)

console.log(domainModel.properties())

