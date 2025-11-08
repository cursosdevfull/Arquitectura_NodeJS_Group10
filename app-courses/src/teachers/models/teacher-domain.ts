export class Teacher {
    private readonly teacherId: number;
    private name: string;
    private lastname: string;
    private email: string;
    private phone: string;
    private linkedIn: string;
    private summary: string;
    private photoUrl: string;
    private skills: string[];
    private active: boolean;

    constructor(name: string, lastname: string, email: string, phone: string, linkedIn: string, summary: string, photoUrl: string, skills: string[]) {
        if (name.length < 3) throw new Error('Name must be at least 3 characters long');

        if (lastname.length < 3) throw new Error('Lastname must be at least 3 characters long');

        if (summary.length < 10) throw new Error('Summary must be at least 10 characters long');

        if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i)) throw new Error('Invalid email address');

        if (!phone.match(/^\d{10}$/)) throw new Error('Invalid phone number');

        if (!linkedIn.match(/^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/)) throw new Error('Invalid LinkedIn URL');

        if (skills.length === 0) throw new Error('At least one skill must be provided');

        if (photoUrl && !photoUrl.match(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i)) throw new Error('Invalid photo URL');

        this.teacherId = Math.floor(Math.random() * 1000);
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
        this.linkedIn = linkedIn;
        this.summary = summary;
        this.photoUrl = photoUrl;
        this.skills = skills;
        this.active = true;
    }

    properties() {
        return {
            teacherId: this.teacherId,
            name: this.name,
            lastname: this.lastname,
            email: this.email,
            phone: this.phone,
            linkedIn: this.linkedIn,
            summary: this.summary,
            photoUrl: this.photoUrl,
            skills: this.skills,
            active: this.active
        };
    }
}