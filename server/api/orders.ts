import {ref} from "vue";

export default defineEventHandler(() => {
    const orders = [
        {
            id: "ORD-002",
            customer: "Budi",
            email: "budi@example.com",
            status: "Pending",
            total: 90000,
            date: "2025-12-02"
        },
        {
            id: "ORD-003",
            customer: "Sinta",
            email: "sinta@example.com",
            status: "Canceled",
            total: 120000,
            date: "2025-12-03"
        },
        {
            id: "ORD-004",
            customer: "Raka",
            email: "raka@example.com",
            status: "Completed",
            total: 175000,
            date: "2025-12-03"
        },
        {
            id: "ORD-005",
            customer: "Asep",
            email: "asep@example.com",
            status: "Pending",
            total: 100000,
            date: "2025-12-04"
        },
        {
            id: "ORD-006",
            customer: "Syukri",
            email: "syukri@example.com",
            status: "Canceled",
            total: 150000,
            date: "2025-12-05"
        },
        {
            id: "ORD-007",
            customer: "Rizal",
            email: "rizal@example.com",
            status: "Completed",
            total: 190000,
            date: "2025-12-06"
        },
        {
            id: "ORD-008",
            customer: "Irma",
            email: "irma@example.com",
            status: "Pending",
            total: 110000,
            date: "2025-12-07"
        },
        {
            id: "ORD-009",
            customer: "Ilham",
            email: "ilham@example.com",
            status: "Canceled",
            total: 130000,
            date: "2025-12-08"
        },
        {
            id: "ORD-010",
            customer: "Nur",
            email: "nur@example.com",
            status: "Canceled",
            total: 150000,
            date: "2025-12-08"
        },
        {
            id: "ORD-011",
            customer: "Rahim",
            email: "rahim@example.com",
            status: "Pending",
            total: 170000,
            date: "2025-12-08"
        },
        {
            id: "ORD-012",
            customer: "Farhan",
            email: "farhan@example.com",
            status: "Completed",
            total: 190000,
            date: "2025-12-08"
        },
        {
            id: "ORD-010",
            customer: "Rizki",
            email: "rizki@example.com",
            status: "Completed",
            total: 200000,
            date: "2025-12-09"
        }
    ];
    return orders
})