import React, { useState } from "react";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { Label } from "../components/label";
import { Card, CardContent } from "../components/card";
import { DateCard } from "../components/dateCard";



const PaymentPlan = () => {
    const [amount, setAmount] = useState<number | null>(null);// Kredi Tutarı
    const [interest, setInterest] = useState<number | null>(null); // yıllık faiz oranı
    const [term, setTerm] = useState<number | null>(null); // taksit sayısı
    const [paymentFrequency, setPaymentFrequency] = useState("AYLIK");// Ödeme Sıklığı

    const [kullandirimTarihi, setKullandirimTarihi] = useState<Date | null>(new Date());
    const [ilkTaksitTarihi, setIlkTaksitTarihi] = useState<Date | null>(null);
    const [vadeTarihi, setVadeTarihi] = useState<Date | null>(null);

    const [tableData, setTableData] = useState<any[]>([]);// Hesaplanan ödeme planı satırlarını bir dizi halinde saklar.


    const generatePaymentTable = (bsmvRate=0.05,kkdfRate=0) => {
        if (!amount || !interest || !term || !ilkTaksitTarihi) return [];

        const monthlyBaseRate = interest / 12 / 100; // Faiz oranı aylık
        const totalMonthlyRate = monthlyBaseRate * (1 + bsmvRate + kkdfRate);

        const payment = (amount * totalMonthlyRate) / (1 - (1 / ((1 + totalMonthlyRate) ** term)));
        let remaining = amount;
        const rows = [];

        for (let i = 1; i <= term; i++) {
            const interestAmount = remaining * monthlyBaseRate;
            const bsmvAmount = interestAmount * bsmvRate;
            const kkdfAmount = interestAmount * kkdfRate;

            const totalInterestAndTaxes = interestAmount + bsmvAmount + kkdfAmount;
            const principal = payment - totalInterestAndTaxes;

            remaining -= principal;

            const date = new Date(ilkTaksitTarihi);
            date.setMonth(date.getMonth() + (i - 1));

            const day = date.getDay();
            if (day === 0) date.setDate(date.getDate() + 1);
            else if (day === 6) date.setDate(date.getDate() + 2);

            rows.push({
                no: i,
                date: date.toLocaleDateString("tr-TR"),
                principal: parseFloat(principal.toFixed(2)),
                interest: parseFloat(interestAmount.toFixed(2)),
                bsmv: parseFloat(bsmvAmount.toFixed(2)),
                kkdf: parseFloat(kkdfAmount.toFixed(2)),
                total: parseFloat(payment.toFixed(2)),
                balance: parseFloat(Math.max(remaining, 0).toFixed(2)),
            });
        }

        return rows;
    };

    const handlePlanCreate = () => {
        if (!kullandirimTarihi || !ilkTaksitTarihi || !vadeTarihi) {
            alert("Lütfen tüm tarihleri seçiniz.");
            return;
        }

        if (!amount || !interest || !term) {
            alert("Tutar, faiz oranı ve taksit sayısı boş bırakılamaz.");
            return;
        }

        if (ilkTaksitTarihi <= kullandirimTarihi) {
            alert("İlk taksit tarihi, kullandırım tarihinden sonra olmalıdır.");
            return;
        }

        if (vadeTarihi <= ilkTaksitTarihi) {
            alert("Vade tarihi, ilk taksit tarihinden sonra olmalıdır.");
            return;
        }

        const newTable = generatePaymentTable();// Oluşturduğumuz veriler ile yeni tablo oluşturduk
        setTableData(newTable);
    };

    return (
        <div className="p-6 space-y-6">
            <header>
                <div className="text-center text-2xl">
                    <p>TAKSİTLİ ÖDEME PLANI</p>
                </div>
            </header>

            <Card>
                <CardContent className="grid grid-cols-4 gap-4 p-4">
                    {/* Kullandırım Tarihi */}
                    <div>
                        <Label>Kullandırım Tarihi</Label>
                        <DateCard value={kullandirimTarihi} onChange={setKullandirimTarihi} />
                    </div>

                    {/* Kullandırım Tutarı */}
                    <div>
                        <Label>Kullandırım Tutarı</Label>
                        <Input
                            type="number"
                            placeholder="Örn: 100000"
                            value={amount ?? ""}
                            onChange={(e) => setAmount(e.target.value === "" ? null : Number(e.target.value))}
                        />
                    </div>

                    {/* Faiz Oranı (Yıllık) */}
                    <div>
                        <Label>Faiz Oranı (Yıllık)</Label>
                        <Input
                            type="number"
                            placeholder="Örn: 50"
                            value={interest ?? ""} // Değeri değiştikçe interest state’i güncellenir.
                            onChange={(e) => setInterest(e.target.value === "" ? null : Number(e.target.value))}
                        />
                    </div>

                    {/* Taksit Sayısı */}
                    <div>
                        <Label>Taksit Sayısı</Label>
                        <Input
                            type="number"
                            placeholder="Örn: 13" // Detay!!
                            value={term ?? ""}
                            onChange={(e) => setTerm(e.target.value === "" ? null : Number(e.target.value))}
                        />
                    </div>

                    {/* Vade Tarihi */}
                    <div>
                        <Label>Vade Tarihi</Label>
                        <DateCard
                            value={vadeTarihi}
                            onChange={setVadeTarihi}
                            minDate={
                                ilkTaksitTarihi
                                    ? new Date(ilkTaksitTarihi.getTime() + 86400000)
                                    : undefined
                            }
                        />
                    </div>

                    {/* Ödeme Sıklığı */}
                    <div>
                        <Label>Ödeme Sıklığı</Label>
                        <select
                            value={paymentFrequency}
                            onChange={(e) => setPaymentFrequency(e.target.value)}
                            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="AYLIK">AYLIK</option>
                            <option value="YILLIK">YILLIK</option>
                            <option value="3 AYLIK">3 AYLIK</option>
                            <option value="6 AYLIK">6 AYLIK</option>
                        </select>
                    </div>

                    {/* İlk Taksit Tarihi */}
                    <div>
                        <Label>İlk Taksit Tarihi</Label>
                        <DateCard
                            value={ilkTaksitTarihi}
                            onChange={setIlkTaksitTarihi}
                            minDate={
                                kullandirimTarihi
                                    ? new Date(kullandirimTarihi.getTime() + 86400000)
                                    : undefined
                            }
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Taksit Tablosu */}
            <Card>
                <CardContent className="overflow-auto p-4">
                    <table className="w-full text-sm text-left border">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="px-2 py-1 border">Taksit No</th>
                            <th className="px-2 py-1 border">Tarih</th>
                            <th className="px-2 py-1 border">Anapara</th>
                            <th className="px-2 py-1 border">Faiz</th>
                            <th className="px-2 py-1 border">BSMV</th>
                            <th className="px-2 py-1 border">KKDF</th>
                            <th className="px-2 py-1 border">Taksit Tutarı</th>
                            <th className="px-2 py-1 border">Borç Bakiyesi</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tableData.map((row) => (
                            <tr key={row.no}>
                                <td className="border px-2 py-1 text-center">{row.no}</td>
                                <td className="border px-2 py-1">{row.date}</td>
                                <td className="border px-2 py-1">{row.principal.toFixed(2)}</td>
                                <td className="border px-2 py-1">{row.interest.toFixed(2)}</td>
                                <td className="border px-2 py-1">{row.bsmv.toFixed(2)}</td>
                                <td className="border px-2 py-1">{row.kkdf.toFixed(2)}</td>
                                <td className="border px-2 py-1">{row.total.toFixed(2)}</td>
                                <td className="border px-2 py-1">{row.balance.toFixed(2)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>

            {/* Ödeme Planı Oluştur Butonu */}
            <Button onClick={handlePlanCreate}>Ödeme Planı Oluştur</Button>
        </div>
    );
};

export default PaymentPlan;
