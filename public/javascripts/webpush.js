
if (window.Notification) {
    Notification.requestPermission(() => {
        if (Notification.permission === 'granted') {
            getSubscriptionObject()
                .then(subscribe)
        }
    });
}

function subscribe(subscription) {
    return fetch('http://localhost:4000/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
}

function getSubscriptionObject() {
    return new Promise((resolve, reject) => {
        navigator.serviceWorker.register('/javascripts/worker.js')
            .then((worker) => {
                return worker.pushManager.getSubscription().then((sub) => {
                    console.log("oldSubs", sub);
                    if (sub) {
                        sub.unsubscribe().then(() => {
                            console.log("if");

                            resolve(subscribeWorker(worker))
                        })
                    } else {
                        console.log("else");
                        resolve(subscribeWorker(worker))
                    }

                });
            });
    });
}

let subscribeWorker = (worker) => worker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
});

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}