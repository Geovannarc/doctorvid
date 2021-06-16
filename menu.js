var telas = ["menu", "tela1", "telatutorial","gameover"];
var larguraJogo = 1280;
var alturaJogo = 720;
var pontuacao = 0;

function menu() {
	
	this.preload = function () {
		
		// Carrega imagem do fundo (o primeiro parâmetro é como
		// nós iremos chamar a imagem no nosso jogo).
		game.load.image("Menu Jogo", "MenuJogo.png");
		game.load.image("botao_jogar", "botao_jogar.png");
		game.load.image("botao_tutorial", "botao_tutorial.png");
		game.load.image("Personagem", "personagem.png");
	
	};
	
	this.create = function () {
		
		
		game.add.tileSprite(0, 0, 1280, 720, "Menu Jogo");
		botaojogar = game.add.image(970, 350, "botao_jogar");
		botaotutorial = game.add.image(20, 350, "botao_tutorial");
		botaojogar.inputEnabled = true;
		botaotutorial.inputEnabled = true;

		// Altera o cursor do mouse quando ele estiver sobre
		// a imagem.
		botaojogar.input.useHandCursor = true;
		botaotutorial.input.useHandCursor = true;
		// Diz qual função deve ser executada quando a imagem
		// for clicada.
		botaojogar.events.onInputDown.add(jogarFoiClicado);
		botaotutorial.events.onInputDown.add(tutorialFoiClicado);	
		
		
		
		fadeIn();
	};
	
	this.update = function () {
		
	};
	
	function tutorialFoiClicado() {
		
		
		// Vamos apenas trocar o fundo do jogo quando a imagem
		// for clicada.
		fadeOut(fadeOutTutorialAcabou);	
	}
	
	function fadeOutTutorialAcabou() {
		
		game.state.start("telatutorial");
		
	}
	
	function jogarFoiClicado() {
		
		// Vamos apenas trocar o fundo do jogo quando a imagem
		// for clicada.
		fadeOut(fadeOutAcabou);	
	}
	
	function fadeOutAcabou() {
		
		// Apenas inicia a primeira tela do jogo.
		game.state.start("tela1");
	}
	
}
