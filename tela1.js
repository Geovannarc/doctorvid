function tela1() {
	
	var piso;
	var tiros;
	var inimigos;
	var horaParaProximoInimigo;
	var virus;
	var barradevidas;
	var doutor;
	
	this.preload = function () {
		
		// Carrega imagem do fundo (o primeiro parâmetro é como
		// nós iremos chamar a imagem no nosso jogo).
		game.load.image("tela1a", "tela1a.png");
		game.load.image("piso", "piso.png");
		game.load.spritesheet("virus", "virus.png", 152, 152);
		game.load.spritesheet("doutor", "doctorgrande.png", 105, 165);
		game.load.spritesheet("barradevidas", "barradevidas.png", 150, 47);
		game.load.spritesheet("inimigo1", "inimigo1.png", 115, 170);
		game.load.spritesheet("inimigo2", "inimigo2.png", 115, 170);
		game.load.spritesheet("inimigo3", "inimigo3.png", 115, 170);
		game.load.spritesheet("inimigo4", "inimigo4.png", 115, 170);
		game.load.spritesheet("inimigo5", "inimigo5.png", 115, 170);
		game.load.spritesheet("inimigo6", "inimigo6.png", 115, 170);
		game.load.image("tiro", "vacina.png");
	};
	
	this.create = function () {
		
		var i;

		game.input.mousePointer.leftButton.onDown.add(acao);
		
		piso = game.add.tileSprite(0, 0, 1280, 720, "piso");
		game.add.tileSprite(0, 0, 1280, 720, "tela1a");
		
		inimigos = game.add.physicsGroup();
		
		// Vamos deixar 40 inimigos já criados. Esse valor será
		// a quantidade máxima de inimigos na tela em um dado
		// momento.
		for (i = 0; i < 40; i++) {
			var resto = i % 6;
			var inimigo;
			if (resto === 0) {
				inimigo = inimigos.create(0, 0, "inimigo1");
			} else if (resto === 1) {
				inimigo = inimigos.create(0, 0, "inimigo2");
			} else if (resto === 2) {
				inimigo = inimigos.create(0, 0, "inimigo3");
			} else if (resto === 3) {
				inimigo = inimigos.create(0, 0, "inimigo4");
			} else if (resto === 4) {
				inimigo = inimigos.create(0, 0, "inimigo5");
			} else {
				inimigo = inimigos.create(0, 0, "inimigo6");
			}
			
			inimigo.animations.add("andando", [0, 1, 2, 3], 8, true);
			
			inimigo.exists = false;
			inimigo.visible = false;
			// Assim como com o personagem, vamos definir a âncora
			// dos tiros para facilitar.
			inimigo.anchor.x = 0.5;
			inimigo.anchor.y = 1;
			//tiro.checkWorldBounds = true;
			//tiro.events.onOutOfBounds.add(destruirTiro);
		}
		
		barradevidas = game.add.sprite(0, 40, "barradevidas");
		barradevidas.frame = 3;
		
		tiros = game.add.physicsGroup();
		
		for (i = 0; i < 5; i++) {
			// Cria um novo tiro na coordenada (0, 0) da tela,
			// o que não importa, porque o tiro não aparecerá
			// ainda, nem terá a física processada (exists = false
			// e visible = false).
			var tiro = tiros.create(0, 0, "tiro");
			tiro.exists = false;
			tiro.visible = false;
			// Assim como com o personagem, vamos definir a âncora
			// dos tiros para facilitar.
			tiro.anchor.x = 0.5;
			tiro.anchor.y = 1;
			// Quando o tiro sair da tela ele deve ser destruído.
			// Caso contrário, ele ficaria ativo para sempre, mesmo
			// não estando mais visível!
			tiro.checkWorldBounds = true;
			tiro.events.onOutOfBounds.add(destruirTiro);
		}
		virus = game.add.sprite(300, 100, "virus");
		game.physics.arcade.enable(virus);
		virus.body.setSize(135, 144, 9, 9);
		virus.body.collideWorldBounds = true;
		virus.enable = true;
		virus.body.velocity.x = 200;
		virus.body.velocity.y = 200;
		//virus.body.gravity.y = 200;
		//virus.body.gravity.x = 200;
		virus.body.bounce.x = 1.12;
		virus.body.bounce.y = 1.12;
		virus.body.maxVelocity.x = 800;
		virus.body.maxVelocity.y = 800;
		//virus.angle = 60;
		
		doutor = game.add.sprite(100, 500, "doutor");
		game.physics.arcade.enable(doutor);
		doutor.body.setSize(65, 45, 20, 20);
		doutor.enable = true;
		doutor.body.immovable = true;
		doutor.anchor.x = 0.5;
		doutor.animations.add("andando", [0, 1, 2, 3], 8, true);
		doutor.animations.play("andando");
		
		horaParaProximoInimigo = game.time.now + 5000;
		
		var estilo = {
			font: "bold 24px 'Press Start 2P'",
			fill: "#000000"
		};
		
		// Adiciona um texto na coordenada (0, 0) da tela,
		// lembrando que (0, 0) está no canto superior esquerdo!
		//
		// Como iremos trabalhar com o sprite depois, precisamos
		// armazenar em uma variável.
		texto = game.add.text(0, 10, "Vidas salvas: 0", estilo);
		// Nossa pontuação inicial.
		pontuacao = 0;
		
		fadeIn();
		
		
	};
	
	this.update = function () {
		
		var i;
		
		var pisoY = piso.tilePosition.y;
		pisoY = pisoY + 2;
		if (pisoY >= 240) {
			pisoY = pisoY - 240;
		}
		piso.tilePosition.y = pisoY;
		
		if (barradevidas.frame >= 1) {
			doutor.x = game.input.mousePointer.x;
		}
		
		if (doutor.x < 150) {
			doutor.x = 150;
		} else if (doutor.x > 1130) {
			doutor.x = 1130;
		}
		
		if (game.time.now > horaParaProximoInimigo) {
			criarInimigo();
		}
		
		inimigos.forEachAlive(verificarPosicaoInimigo);
		
		game.physics.arcade.overlap(tiros, inimigos, tiroAcertouInimigo);
		
		game.physics.arcade.collide(virus, doutor, virusAcertouDoutor);
		
	};
	
	function virusAcertouDoutor(virus, doutor) {
		
		if (barradevidas.frame >= 1) {
			barradevidas.frame = barradevidas.frame - 1;
			
			if (barradevidas.frame <= 0) {
				fadeOut(irParaGameOver);
			}
		}
		
	}

	function irParaGameOver() {
		game.state.start("gameover");
	}
		
	function tiroAcertouInimigo(tiro, inimigo) {

		tiro.kill();
		inimigo.kill();
		pontuacao = pontuacao + 1;
		texto.setText("Vidas salvas: " + pontuacao);
		
	}
	function verificarPosicaoInimigo(inimigo) {
		if(inimigo.y > 1000) {
				
			inimigo.kill();
		}
	}

	
	function criarInimigo() {
		
		var inimigosDisponiveis = inimigos.getAll("exists", false);
		
		if (inimigosDisponiveis && inimigosDisponiveis.length) {
			var inimigo = inimigosDisponiveis[(Math.random() * inimigosDisponiveis.length) | 0];
			
			inimigo.reset(270 + (Math.random() * 740), 0);
			inimigo.body.velocity.y = 550;
			inimigo.animations.play("andando");
			
			horaParaProximoInimigo = game.time.now + 100 + (Math.random() * 1400);
		}
		
	}
	
	function acao() {
		
		if (barradevidas.frame <= 0) {
			return;
		}
		
		// Nós criamos 5 tiros, assim, só poderão existir no
		// máximo 5 tiros na tela, em qualquer momento!
		var tiro = tiros.getFirstExists(false);
		
		if (tiro) {
			tiro.reset(doutor.x, doutor.y + 90);
			tiro.body.velocity.y = -650;
		}
		
	}
	
	function destruirTiro(tiro) {
	
		tiro.kill();
		
	}
	
}
