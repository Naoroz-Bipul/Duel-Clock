function updateDuelClock() {
    // Asia/Dhaka টাইমজোনে সময় গণনাকরণ
    const now = new Date();
    const dhakaTimeString = now.toLocaleString("en-US", { timeZone: "Asia/Dhaka" });
    const dhakaDate = new Date(dhakaTimeString);

    const hours = dhakaDate.getHours();
    const minutes = dhakaDate.getMinutes();
    const seconds = dhakaDate.getSeconds();

    // ১. অ্যানালগ ঘড়ির কাঁটা ঘোরানোর ডিগ্রি হিসাব
    const secondDeg = (seconds / 60) * 360;
    const minuteDeg = ((minutes + seconds / 60) / 60) * 360;
    const hourDeg = (((hours % 12) + minutes / 60) / 12) * 360;

    document.getElementById('secondHand').style.transform = `rotate(${secondDeg}deg)`;
    document.getElementById('minuteHand').style.transform = `rotate(${minuteDeg}deg)`;
    document.getElementById('hourHand').style.transform = `rotate(${hourDeg}deg)`;

    // ২. ডিজিটাল ঘড়ির ফরম্যাট
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    const ampmText = hours >= 12 ? 'PM' : 'AM';
    
    const formattedHours = String(displayHours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    document.getElementById('digitalTime').textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    document.getElementById('ampm').textContent = ampmText;

    // বাংলা ফরম্যাটে তারিখ প্রদর্শন
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dhakaDate.toLocaleDateString('bn-BD', options);
    document.getElementById('digitalDate').textContent = formattedDate;
}

// প্রতি সেকেন্ডে সময় আপডেট হবে
setInterval(updateDuelClock, 1000);

// প্রথমবার পেজ লোড হবার সাথে সাথে রান করবে
updateDuelClock();
