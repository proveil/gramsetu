import {create} from "zustand"


const useFeatureCardInfo = create((set,get)=>({
    feature1: [
        {
            check: true,
            info: "Seemless Scheme Apply"
        },
        {
            check: true,
            info: "E-Services Agent Booking"
        },
        {
            info: "Guides for applying to Schemes"
        },
        {
            info: "E-books"
        },
        {
            info: "Emergency Services"
        },
        {
            info: "more..."
        }
    ],
    feature2: [
        {
            check: true,
            info: "Seemless Scheme Apply"
        },
        {
            check: true,
            info: "E-Services Agent Booking"
        },
        {
            check: true,
            info: "Guides for applying to Schemes"
        },
        {
            check: true,
            info: "E-books"
        },
        {
            info: "Emergency Services"
        },
        {
            info: "more..."
        }
    ],

    feature3: [
        {
            check: true,
            info: "Seemless Scheme Apply"
        },
        {
            check: true,
            info: "E-Services Agent Booking"
        },
        {
            check: true,
            info: "Guides for applying to Schemes"
        },
        {
            check: true,
            info: "E-books"
        },
        {
            check: true,
            info: "Emergency Services"
        },
        {
            check: true,
            info: "more..."
        }
    ]
}))


export default useFeatureCardInfo

