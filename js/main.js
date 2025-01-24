$(function () {


    
    // 스크롤시 네비게이션바 변하게 하기
    $(window).resize(function(){
        pot=$('.cloudbg1').offset().top;
    })
    let pot = $('.cloudbg1').offset().top;
    
    let scrolled = $(window).scrollTop()>=pot;
        $('header').toggleClass('fixed',scrolled);
        
    $(window).scroll(function(){
        // console.log($(window).scrollTop())
        let scrolled = $(window).scrollTop()>=pot;
        $('header').toggleClass('fixed',scrolled);
    });
    


    // footer 옵션
    $('.fn').click(function(e){
        e.preventDefault();
        $(this).toggleClass('on');
        let idx = $(this).index();
        $('.fo').eq(idx).toggle();
        
        if($(this).hasClass('on')){
            $(this).siblings().removeClass('on')
            $(this).siblings().find('.fo').hide()
        };
    })



    // 탑버튼
    $(window).scroll(function(){
        if($(window).scrollTop()>=10){
            $('.gotop').addClass('down')
        }else{
            $('.gotop').removeClass('down')
        };

    })
    
    $('.gotop').click(function(){
        $('html,body').animate({
            scrollTop:0,
        },1000);
    });


    // 햄버거 버튼
    $('.hamburger').click(function(){
        // alert('햄벅')
        $('.menu').show();
        $('body').addClass('menuon');
    });

    $('.xbtn').click(function(){
        $('.menu').hide();
        $('body').removeClass('menuon');
    });

    $('.mainmenu>li').click(function(){
        $(this).toggleClass('touch');
        
        // 클릭한 항목의 서브메뉴를 토글
        $(this).children('.submenu').toggle();
    
        // 다른 항목들의 서브메뉴는 숨기기
        if($(this).hasClass('touch')){
            $(this).siblings().removeClass('touch');
            $(this).siblings().find('.submenu').hide();
        }
    });
})







const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Firework {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.particles = [];
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            this.particleCount = 100;
            this.createParticles();
        }

        createParticles() {
            for (let i = 0; i < this.particleCount; i++) {
                const angle = Math.random() * 2 * Math.PI;
                const speed = Math.random() * 4 + 2;
                const lifetime = Math.random() * 2 + 2;
                const particle = {
                    x: this.x,
                    y: this.y,
                    dx: Math.cos(angle) * speed,
                    dy: Math.sin(angle) * speed,
                    alpha: 1,
                    life: lifetime,
                    color: this.color,
                };
                this.particles.push(particle);
            }
        }

        update() {
            this.particles.forEach((particle, index) => {
                // 입자 위치 업데이트
                particle.x += particle.dx;
                particle.y += particle.dy;

                // 화면 경계를 넘지 않도록 반사 효과 적용
                if (particle.x < 0 || particle.x > canvas.width) {
                    particle.dx = -particle.dx; // x 방향 반사
                }
                if (particle.y < 0 || particle.y > canvas.height) {
                    particle.dy = -particle.dy; // y 방향 반사
                }

                // 점점 사라지도록 처리
                particle.alpha -= 0.02;
                particle.life -= 0.05;

                // 불꽃놀이가 모두 사라지면 제거
                if (particle.alpha <= 0 || particle.life <= 0) {
                    this.particles.splice(index, 1);
                }
            });
        }

        draw() {
            this.particles.forEach(particle => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.globalAlpha = particle.alpha;
                ctx.fill();
            });
        }
    }

    let fireworks = [];

    function createFirework() {
        // 화면 안쪽에서만 불꽃놀이가 발생하도록 x, y 값을 제한
        const x = Math.random() * (canvas.width - 100) + 50;
        const y = Math.random() * (canvas.height - 100) + 50;
        fireworks.push(new Firework(x, y));
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        fireworks.forEach(firework => {
            firework.update();
            firework.draw();
        });

        // 0.1 확률로 불꽃놀이를 생성
        if (Math.random() < 0.1) {
            createFirework();
        }

        requestAnimationFrame(animate);
    }

    animate();