// INDEXページ用スクリプト
document.addEventListener('DOMContentLoaded', function() {
    // スライダー関連の要素取得
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevArrow = document.querySelector('.slider-arrow.prev');
    const nextArrow = document.querySelector('.slider-arrow.next');
    
    let currentIndex = 1; // アクティブスライドのインデックス（中央の画像）
    const slideCount = slides.length;
    
    // スライダーの初期化
    function initSlider() {
        updateSlider();
    }
    
    // スライダーの更新
    function updateSlider() {
        // スライダーの位置を更新
        sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // アクティブクラスをリセット
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // 現在のスライドとドットをアクティブに設定
        slides[currentIndex].classList.add('active');
        // ドットは0と1のみなので、インデックスを調整
        const dotIndex = currentIndex === 0 ? 1 : (currentIndex === slideCount - 1 ? 0 : 0);
        dots[dotIndex].classList.add('active');
    }
    
    // 前のスライドに移動
    function goToPrevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSlider();
    }
    
    // 次のスライドに移動
    function goToNextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlider();
    }
    
    // 特定のスライドに移動（ドット用）
    function goToSlide(index) {
        currentIndex = index === 0 ? 1 : 0; // ドットは2つだけなので、0か1に対応
        updateSlider();
    }
    
    // イベントリスナー設定
    prevArrow.addEventListener('click', goToPrevSlide);
    nextArrow.addEventListener('click', goToNextSlide);
    
    // ドットクリック時のイベント
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // 自動スライド切り替え（5秒ごと）
    let autoSlideInterval = setInterval(goToNextSlide, 5000);
    
    // スライダーにマウスオーバー時は自動切り替えを一時停止
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    // スライダーからマウスが離れたら自動切り替えを再開
    sliderContainer.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(goToNextSlide, 5000);
    });
    
    // スライダー初期化
    initSlider();
});