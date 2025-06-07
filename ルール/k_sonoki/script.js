document.addEventListener('DOMContentLoaded', function() {
    // ハンバーガーメニュー
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    
    if (hamburger && mobileMenu && closeMenu) {
        hamburger.addEventListener('click', function() {
            mobileMenu.classList.add('open');
        });
        
        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.remove('open');
        });
    }
    
    // カルーセル機能（YouTubeプレーヤー用に最適化）
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    if (carouselTrack && carouselItems.length && prevButton && nextButton) {
        let currentIndex = 0;
        let itemWidth;
        let itemsPerView;
        let maxIndex;
        
        // カルーセルインジケーターの追加
        const carouselContainer = carouselTrack.parentElement;
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'carousel-indicators';
        
        // インジケーターを作成
        function createIndicators() {
            indicatorsContainer.innerHTML = '';
            const numIndicators = Math.ceil(carouselItems.length / itemsPerView);
            
            for (let i = 0; i < numIndicators; i++) {
                const indicator = document.createElement('div');
                indicator.className = 'carousel-indicator';
                if (i === 0) indicator.classList.add('active');
                
                indicator.addEventListener('click', function() {
                    currentIndex = i * itemsPerView;
                    if (currentIndex > maxIndex) currentIndex = maxIndex;
                    updateCarouselPosition();
                    updateIndicators();
                });
                
                indicatorsContainer.appendChild(indicator);
            }
        }
        
        // インジケーターの更新
        function updateIndicators() {
            const indicators = document.querySelectorAll('.carousel-indicator');
            const activeIndex = Math.floor(currentIndex / itemsPerView);
            
            indicators.forEach((indicator, index) => {
                if (index === activeIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
        
        // ウィンドウサイズに応じて表示数を変更
        function updateCarouselSettings() {
            const containerWidth = carouselContainer.clientWidth;
            
            if (window.innerWidth <= 480) {
                itemsPerView = 1;
            } else if (window.innerWidth <= 768) {
                itemsPerView = 1;
            } else if (window.innerWidth <= 1024) {
                itemsPerView = 2;
            } else {
                itemsPerView = 3; // PC幅では3件表示
            }
            
            itemWidth = containerWidth / itemsPerView;
            maxIndex = carouselItems.length - itemsPerView;
            
            // アイテムの幅を設定
            carouselItems.forEach(item => {
                item.style.flex = `0 0 ${itemWidth}px`;
                item.style.maxWidth = `${itemWidth}px`;
            });
            
            // 現在のインデックスが範囲外になった場合は修正
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
                updateCarouselPosition();
            }
            
            // インジケーター更新
            createIndicators();
            updateIndicators();
        }
        
        function updateCarouselPosition() {
            carouselTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
            updateIndicators();
        }
        
        // 次へボタン - 複数スライド
        nextButton.addEventListener('click', function() {
            if (currentIndex < maxIndex) {
                // スムーズにスライドするために複数のアイテムをスライド
                currentIndex = Math.min(currentIndex + itemsPerView, maxIndex);
                updateCarouselPosition();
            } else {
                // 最後まで行ったら最初に戻る (ループ機能)
                currentIndex = 0;
                updateCarouselPosition();
            }
        });
        
        // 前へボタン - 複数スライド
        prevButton.addEventListener('click', function() {
            if (currentIndex > 0) {
                // スムーズにスライドするために複数のアイテムをスライド
                currentIndex = Math.max(currentIndex - itemsPerView, 0);
                updateCarouselPosition();
            } else {
                // 最初まで戻ったら最後に移動 (ループ機能)
                currentIndex = maxIndex;
                updateCarouselPosition();
            }
        });
        
        // 自動再生機能（任意）
        let autoplayInterval;
        
        function startAutoplay() {
            autoplayInterval = setInterval(() => {
                if (currentIndex < maxIndex) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                updateCarouselPosition();
            }, 5000); // 5秒ごとに自動スライド
        }
        
        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }
        
        // マウスオーバーで自動再生を一時停止
        carouselContainer.addEventListener('mouseenter', stopAutoplay);
        carouselContainer.addEventListener('mouseleave', startAutoplay);
        
        // インジケーターをコンテナに追加
        carouselContainer.appendChild(indicatorsContainer);
        
        // 初期設定
        updateCarouselSettings();
        startAutoplay();
        
        // リサイズ時に再計算
        window.addEventListener('resize', function() {
            updateCarouselSettings();
            updateCarouselPosition();
        });
    }
    
    // フィルタリング機能 (DISCOGRAPHY & NEWS)
    const filterButtons = document.querySelectorAll('.filter-buttons a');
    const items = document.querySelectorAll('.discography-item, .news-item');
    
    if (filterButtons.length && items.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // アクティブクラスを切り替え
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                items.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-type') === filter) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // ページネーション機能
    const paginationLinks = document.querySelectorAll('.pagination a');
    
    if (paginationLinks.length) {
        paginationLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // 実際のアプリケーションではここでページ遷移か
                // 非同期データ取得を行いますが、デモではアクティブクラスの切り替えのみ
                document.querySelectorAll('.pagination .page').forEach(page => {
                    page.classList.remove('active');
                });
                
                if (this.classList.contains('page')) {
                    this.classList.add('active');
                }
            });
        });
    }
    
    // スムーススクロール
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // #だけの場合や外部リンクの場合はスキップ
            if (href === '#' || href.indexOf('#') !== 0) return;
            
            const targetId = href.split('#')[1];
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // モバイルメニューが開いている場合は閉じる
                if (mobileMenu && mobileMenu.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                }
                
                // スムーススクロール
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // フォームバリデーション
    const contactForm = document.querySelector('.contact-section form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 実際のアプリケーションではここでフォームデータを送信しますが、
            // デモではアラートを表示するだけ
            alert('お問い合わせを受け付けました。ありがとうございます。');
            this.reset();
        });
    }
    
    // 画像ホバーエフェクト
    const carouselItems2 = document.querySelectorAll('.carousel-item');
    
    if (carouselItems2.length) {
        carouselItems2.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const overlay = this.querySelector('.overlay');
                if (overlay) {
                    overlay.style.opacity = '1';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                const overlay = this.querySelector('.overlay');
                if (overlay) {
                    overlay.style.opacity = '0';
                }
            });
        });
    }
    
    // 画像フォルダを作成
    // Note: 実際のウェブサイトでは画像は別途用意されるものとする
    // このコードはデモのための仮のもので、実際には必要ありません
    console.log('画像フォルダは別途用意されるものとします');
});