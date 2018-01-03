export class transaction {
    id: Number,
    from: String,
    to: String,
    value: Number,
    date:{
        type: Date,
        default: new Date()
    }

}