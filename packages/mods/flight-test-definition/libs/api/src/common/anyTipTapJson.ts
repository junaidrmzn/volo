export const anyTipTapJson = (text?: string) => ({
    type: "doc",
    content: [
        {
            type: "paragraph",
            content: [
                {
                    type: "text",
                    text: text || "any text",
                },
            ],
        },
    ],
});
