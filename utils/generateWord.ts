import { faker } from "@faker-js/faker";

// TODO: Fix if there are any '-' in the words
export default function generateWord(num: number): string {
    return faker.word.words(num);
}