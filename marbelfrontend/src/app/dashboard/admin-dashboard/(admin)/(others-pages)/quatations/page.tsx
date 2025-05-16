"use client";

import React, { useEffect, useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

interface Quotation {
    id: string;
    requirement: string;
    qnt: number;
    unit: string;
}

const QuatationsPage = () => {
    const [quotations, setQuotations] = useState<Quotation[]>([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/quotations`)
            .then((res) => res.json())
            .then((data) => setQuotations(data))
            .catch((err) => console.error("Failed to fetch enquiries", err));
    }, []);


    return (
        <div className="p-2">
            <PageBreadcrumb pageTitle="Quatations" />
            <h1 className="text-2xl mb-4 font-bold">Quotations</h1>
            <div className="w-full overflow-x-auto">
                <table className="min-w-full table-fixed border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-sm">
                            <th className="w-6 border px-2 py-2">#</th>
                            <th className="min-w-[200px] border px-2 py-2">Requirement</th>
                            <th className="min-w-[130px] border px-2 py-2">Quantity</th>
                            <th className="min-w-[130px] border px-2 py-2">Unit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quotations.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center py-4">
                                    No quotations submitted yet.
                                </td>
                            </tr>
                        ) : (
                            quotations.map((quotation, index) => (
                                <tr key={quotation.id} className="text-sm text-center align-top">
                                    <td className="border px-2 py-2">{index + 1}</td>
                                    <td className="border px-2 py-2 break-words">{quotation.requirement}</td>
                                    <td className="border px-2 py-2 break-words">{quotation.qnt}</td>
                                    <td className="border px-2 py-2 break-words">{quotation.unit}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default QuatationsPage
