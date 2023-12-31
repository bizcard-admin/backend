const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const _cardSchema = new Schema({
    cardName: {
        type: String,
        required: true
    },
    name: {
        firstName: {
            type: String,
            default: null
        },
        middleName: {
            type: String,
            default: null
        },    
        lastName: {
            type: String,
            default: null
        },
        prefix: {
            type: String,
            default: null
        }
    },  
    bio: {
        type: String,
        default: null
    }, 
    phoneNumber: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    address: {
        addressLine1: {
            type: String,
            default: null
        },
        addressLine2: {
            type: String,
            default: null
        },
        city: {
            type: String,
            default: null
        },
        state: {
            type: String,
            default: null
        },
        country: {
            type: String,
            default: null
        },
        pinCode: {
            type: String,
            default: null
        }
    },
    company: {
        title: {
            type: String,
            default: null
        },
        department: {
            type: String,
            default: null
        },
        companyName: {
            type: String,
            default: null
        },
        companyWebsite: {
            type: String,
            default: null
        },
        companyDescription: {
            type: String,
            default: null
        }
    },
    picture: {
        type: String,
        default: null
    },
    logo: {
        type: String,
        default: null
    },
    banner: {
        type: String,
        default: null
    },
    design: {
        type: String,
        enum: ["classic", "modern", "sleek", "flat"],
        default: "classic"
    },
    theme: {
        type: String,
        default: '#ffffff'
    },
    badges: {
        type: Object,
        default: []
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE", "PAUSED","DELETED"],
        default: "ACTIVE"
    },
    fields: {
        type: [{
            id: {
                type: String,
                default: null
            },
            name: {
                type: String,
                default: null
            },
            value: {
                type: String,
                default: null
            },
            highlight: {
                type: Boolean,
                default: false
            },
            desc: {
                type: String,
                default: null
            }
        }],
        default: []
    },
    qr: {
        logo: {
            type: String,
            default: null
        },
        codeStyle: {
            type: String,
            default: "dots"
        },
        eyeStyle: {
            type: String,
            default: "leaf"
        },
        fgColor: {
            type: String,
            default: "#000000"
        },
        eyeColor: {
            type: String,
            default: "#008080"
        }
    },
    qrVisible: {
        type: Boolean,
        default: false
    },
    qrWithLogo: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true
    },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    deleted: { type: Date, default: null }
})

const getCardModel = () => {
    return mongoose.model("Cards", _cardSchema, "Cards");
};

module.exports = {
    getCardModel
};