export default function getTwelveHourFormat(date: Date): string {
    const mod: number = date.getHours() % 12;

    return String(mod === 0 ? 12 : mod);
}