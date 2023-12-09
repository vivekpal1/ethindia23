import { waku } from '@waku/sdk';

export async function initializeWaku() {
    const waku = await waku.create({ bootstrap: true });
    await waku.start();
    return waku;
}

export async function sendClipboardData(waku, clipboardData, topic) {
    if (!waku) {
        console.error('Waku node is not initialized');
        return;
    }

    const message = await waku.createWakuMessage({
        payload: clipboardData,
        contentTopic: topic
    });

    await waku.relay.send(message);
    console.log('Clipboard data sent to topic:', topic);
}

export function listenToClipboardMessages(waku, topic, setClipboardText) {
    if (!waku) {
        console.error('Waku node is not initialized');
        return;
    }

    waku.relay.addObserver((message) => {
        if (message.contentTopic === topic) {
            const clipboardData = message.payloadAsUtf8;
            setClipboardText(clipboardData);
        }
    }, [topic]);

    console.log(`Listening to clipboard messages on topic: ${topic}`);
}
