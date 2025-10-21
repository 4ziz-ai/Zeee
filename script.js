// Dapatkan elemen-elemen dari HTML
const tombolTunjukkan = document.getElementById('tombol-tunjukkan');
const pesanContainer = document.getElementById('pesan-container');
const teksPeringatan = document.getElementById('teks-peringatan');
const teksKetikElemen = document.getElementById('teks-ketik');
const signatureElemen = document.getElementById('signature-ketik');
// const fotoContainer = document.getElementById('foto-container'); // Hapus ini

// NARASI (Sama seperti sebelumnya)
const teksPenyesalan = `
Sayang, hanya ego sesaat yang membuatku kehilangan rumah abadi. Aku sadar, **kesalahan terbesar adalah meremehkan dirimu.**

Aku sudah berubah. Tanpamu, tidak ada masa depan yang berarti. Aku janji, tidak ada lagi bayangan lain di samping kita.

Aku mohon, lihatlah mataku lagi.

Aku hanya butuh satu kesempatan. **Satu kesempatan untuk menjagamu seumur hidup.**

Aku merindukan kita. Pulanglah.
`;

const signatureText = `Aku yang sedang berjuang untuk pantas, \ndengan hati yang berdenyut hanya untukmu.`;
let isTyping = false; 
const typingSpeed = 90; // Kecepatan mengetik yang sengaja dibuat lambat

function typeWriter(text, element, speed) {
    let i = 0;
    isTyping = true;
    
    // Siapkan teks: Ganti markdown menjadi HTML
    let formattedText = text
        .trim()
        .replace(/\n\n/g, '<br><br>') 
        .replace(/\n/g, '<br>')      
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); 

    function typing() {
        if (i < formattedText.length) {
            
            if (formattedText.charAt(i) === '<') {
                const endIndex = formattedText.indexOf('>', i);
                if (endIndex !== -1) {
                    element.innerHTML += formattedText.substring(i, endIndex + 1);
                    i = endIndex + 1;
                }
            } else {
                element.innerHTML += formattedText.charAt(i);
                i++;
            }
            
            setTimeout(typing, speed);
        } else {
            // --- FASE 2: SELESAI MENGETIK ---
            isTyping = false;
            pesanContainer.classList.add('typed'); 
            
            // Tampilkan tanda tangan (setelah 1 detik jeda)
            setTimeout(() => {
                signatureElemen.innerHTML = signatureText.replace(/\n/g, '<br>');
                signatureElemen.style.opacity = 1;

                // --- HAPUS LOGIKA UNTUK MENAMPILKAN FOTO DI SINI ---
                // Karena foto sudah jadi background, tidak perlu ditampilkan lagi
                tombolTunjukkan.textContent = 'Semua harapanku ada di sini.';
                tombolTunjukkan.disabled = true;
                tombolTunjukkan.style.backgroundColor = '#666'; 
                
            }, 1000); 
        }
    }
    typing();
}

// Event Listener untuk Tombol Pengakuan
tombolTunjukkan.addEventListener('click', function() {
    if (isTyping) return; 

    // 1. Tampilkan kontainer pesan utama
    pesanContainer.classList.add('visible');

    // 2. Sembunyikan/Ubah elemen lain
    tombolTunjukkan.style.display = 'none';
    teksPeringatan.style.display = 'none';

    // 3. Mulai efek ketikan
    typeWriter(teksPenyesalan, teksKetikElemen, typingSpeed); 
});
