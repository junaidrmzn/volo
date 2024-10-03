export function* alphabeticStringGenerator(): Generator<string> {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let length = 1;

    while (true) {
        for (let outerLoopIndex = 0; outerLoopIndex < alphabet.length ** length; outerLoopIndex++) {
            let string = "";
            let index = outerLoopIndex;
            for (let innerLoopIndex = 0; innerLoopIndex < length; innerLoopIndex++) {
                string = alphabet[index % alphabet.length] + string;
                index = Math.floor(index / alphabet.length);
            }
            yield string;
        }
        length++;
    }
}
