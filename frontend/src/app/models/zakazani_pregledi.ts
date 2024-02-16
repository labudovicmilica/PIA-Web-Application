import { Time } from "@angular/common";

export class ZakazanPregled{
    id: number;
    naziv: string;
    pacijent: string;
    lekar: string;
    datum_vreme: Date;
    trajanje: number;
    ogranak: string;
    otkazan: boolean;
    ime_prezime: string;
    obav: boolean;
    spec: string;
}