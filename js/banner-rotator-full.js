var timing,
banner = {
    /** CONFIG **/
    containerDiv: 'banner-container',
    containerDesc: 'desc-banner',
    containerNav: 'nav-container',
    descDisabled: false,
    delay: 3500, // ms

    pos: 0,
    imgs: null,
    nav: null,
    imgsCount: 0,
    init: function () {
        banner.imgs = document.getElementById(banner.containerDiv).getElementsByTagName('img');
        banner.imgsCount = banner.imgs.length-1;

        if (!banner.descDisabled) {
            banner.geraNav();
        }

        banner.loopImagem();

        $(window).resize(function() { banner.resizeImgs() });
        $(window).resize();
    },
    geraNav: function () {
        for (var i=0;i<=banner.imgsCount;i++) {
            $('#' + banner.containerNav).append('<div index="' + i + '"></div>');
        }

        banner.nav = document.getElementById(banner.containerNav).getElementsByTagName('div');

        $(banner.nav).click(function () {
            banner.loopImagem($(this).attr('index'));
        });
    },
    loopImagem: function (pos) {
        clearTimeout(timing);
        
        if (pos == banner.pos-1) return; // se ele tenta habilitar o banner ativo
        if (pos) banner.pos = pos;

        // troca imagem
        $(banner.imgs).fadeOut(600);
        $(banner.imgs[banner.pos]).fadeIn(600);

        if (!banner.descDisabled) {
            $('#' + banner.containerDesc + ' #titulo').html(banner.imgs[banner.pos].title);
            $('#' + banner.containerDesc + ' #desc').html(banner.imgs[banner.pos].alt);

            $(banner.nav).removeClass('active');
            $(banner.nav[banner.pos]).addClass('active');
        }
        
        if (banner.pos==banner.imgsCount) { // se chegar ao fim das imagens volta ao inicio
            banner.pos = 0;
        } else {
            banner.pos++;
        }
        
        timing = setTimeout(function(){ banner.loopImagem() }, banner.delay);
    },
    /**
     * Redimensionar imagens de background
     * http://guilhermemuller.com.br/pt/posts/3/como-fazer-uma-imagem-de-fundo-preencher-a-tela-inteira
     * @author Guilherme Müller
     */
    resizeImgs: function () {
        $(banner.imgs).each(function(){
            var targetimg = $(this),
                wheight = $(window).height(), // altura da janela do navegador
                wwidth = $(window).width(); // largura da janela do navegador
            
            // removemos os atributos de largura e altura da imagem
            targetimg.removeAttr("width")
                     .removeAttr("height")
                     .css({ width: "", height: "" }); // removemos possíveis regras css também
            
            var imgwidth = targetimg.width(), // largura da imagem
                imgheight = targetimg.height(), // altura da imagem
                destwidth = wwidth, // largura que a imagem deve ter
                destheight = wheight; // altura que a imagem deve ter
            
            // aqui vamos determinar o tamanho final da imagem
            if(imgheight < wheight) {
                // se a altura da imagem for menor que a altura da tela, fazemos um cálculo
                // para redefinir a largura da imagem para bater com a altura que queremos
                destwidth = (imgwidth * wheight)/imgheight;
                
                targetimg.height(destheight)
                            .width(destwidth);
            }
            
            // aqui utilizamos um cálculo simples para determinar o posicionamento da imagem
            // para que a mesma fique no meio da tela
            // posição = dimensão da imagem/2 - dimensão da tela/2
            destheight = targetimg.height();
            var posy = (destheight/2 - wheight/2),
                posx = (destwidth/2 - wwidth/2);
            
            //se o cálculo das posições der resultado positivo, trocamos para negativo
            if(posy > 0) {
                posy *= -1;
            }
            if(posx > 0) {
                posx *= -1;
            }
            
            // colocamos através da função css() do jquery o posicionamento da imagem
            // $('#banner #imagem').css({'top': posy + 'px', 'left': posx + 'px'});
            targetimg.css({'top': posy + 'px', 'left': posx + 'px'});
        });
    }
};