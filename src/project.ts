import { promises as fs } from "fs"

type Status = "to-do" | "in-progress" | "blocked" | "complete"

class Task {
    name: string
    description: string
    creation_date: Date
    deadline: Date
    owner: string[]
    priority: number
    status: Status

    constructor( name          : string, 
                 description   : string, 
                 creation_date : Date, 
                 deadline      : Date, 
                 owner         : string[], 
                 priority      : number ) {

        this.name          = name
        this.description   = description
        this.owner         = owner
        this.priority      = priority
        this.status        = "to-do"

        this.creation_date = creation_date

        if (deadline < creation_date) {
            this.deadline = creation_date
        } else {
            this.deadline = deadline}
    }

    //--------------------------------------------------
    //      Deadline management
    //----------------------
    
    // Set new Deadline for the task 
    set_deadline(deadline: Date) {
        this.deadline = deadline
    }

    
    //--------------------------------------------------
    //      Status management
    //----------------------
    
    // Set new Status for the task
    set_status(status: Status) {
        this.status = status
    }

    
    //--------------------------------------------------
    //      Owner management
    //----------------------

    // Add new owner to the task
    add_owner(owner: string) {
        this.owner.push(owner)
    }

    // Remove owner from the task
    remove_owner(owner:string) {
        this.owner = this.owner.filter(p => p !== owner)
    }

    //--------------------------------------------------
    //      JSON export/import
    //--------------------------------------------------
    toJSON() {
        return {
            name: this.name,
            description: this.description,
            creation_date: this.creation_date.toISOString(),
            deadline: this.deadline.toISOString(),
            owner: this.owner,
            priority: this.priority,
            status: this.status
        }
    }

    static fromJSON(json: string | object): Task {
        let obj = typeof json === "string" ? JSON.parse(json) : json
        return new Task(
            obj.name,
            obj.description,
            new Date(obj.creation_date),
            new Date(obj.deadline),
            obj.owner,
            obj.priority
        )
    }
}



class Project {
    name: string
    path: string
    deadline: Date
    main_task: Task
    description: string

    constructor( name       : string,
                 path       : string,
                 deadline   : Date,
                 main_task  : Task,
                 description: string ) {

        this.name        = name
        this.path        = path
        this.deadline    = deadline
        this.main_task   = main_task
        this.description = description

    }

    //--------------------------------------------------
    //      Deadline management
    //----------------------
    
    // Set new Deadline for the task 
    set_deadline(deadline: Date) {
        this.deadline = deadline
    }


    //--------------------------------------------------
    //      JSON export/import
    //--------------------------------------------------
    async createJSONFile() {
        const filePath = `${this.path}${this.name}.json`

        try {
            await fs.access(filePath) // verifica se existe
        } catch {
            // Cria o JSON com os dados do projeto
            const jsonContent = JSON.stringify({
                name: this.name,
                path: this.path,
                deadline: this.deadline.toISOString(),
                main_task: this.main_task.toJSON(),
                description: this.description,
        })

        await fs.writeFile(filePath, jsonContent)
        }
    }

        static fromJSON(json: string | object): Project {
        let obj = typeof json === "string" ? JSON.parse(json) : json
        return new Project(
            obj.name,
            obj.path,
            new Date(obj.deadline),
            Task.fromJSON(obj.main_task),
            obj.description
        )
    }
}
    
