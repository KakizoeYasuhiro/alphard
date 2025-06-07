// ハンバーガーメニューとカルーセルの機能
document.addEventListener('DOMContentLoaded', function() {
    // ハンバーガーメニュー
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const closeMenu = document.querySelector('.close-menu');
    
    function openMenu() {
        mobileMenu.classList.add('open');
        mobileOverlay.classList.add('open');
        document.body.style.overflow = 'hidden'; // スクロール防止
    }
    
    function closeMenuFunc() {
        mobileMenu.classList.remove('open');
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }
    
    if (hamburger && mobileMenu && closeMenu) {
        hamburger.addEventListener('click', openMenu);
        
        closeMenu.addEventListener('click', closeMenuFunc);
        
        // オーバーレイクリックでもメニューを閉じる
        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', closeMenuFunc);
        }
    }

    // モバイルメニュー内のリンクがクリックされたときにメニューを閉じる
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenuFunc);
    });

    // ウィンドウのサイズが変更された時にモバイルメニューを閉じる
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMenuFunc();
        }
    });
    
    // カルーセル機能
    // カルーセル機能はartists2.htmlに直接記述されているので、ここではハンバーガーメニューのみ実装
});