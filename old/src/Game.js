var show_hitboxes = false;
var show_pos = false;

class Game {
	constructor() {
		this.dpi = window.devicePixelRatio;
		this.scan = document.querySelector('canvas');

		this.chapters = [menu, chapter1, chapter2];

		this.fingers = [];
		this.finger_events = [];
		setFingers(this.scan, this.fingers, this.finger_events, this.dpi);
		this.controls = { L: 0, R: 0 };

		this.resize();

		window.addEventListener('resize', event => {
			this.resize();
		});

		this.loadChapter(0);
	}

	screeshot() {
		document.documentElement.innerHTML = `<img src='${this.gcan.toDataURL()}'></img>`;
	}

	resize() {
		this.scan.width = window.innerWidth;
		this.scan.height = window.innerHeight;

		this.scan.setAttribute('height', this.scan.clientHeight * this.dpi);
		this.scan.setAttribute('width', this.scan.clientWidth * this.dpi);

		this.scale = (window.innerHeight / (this.state == 'menu' ? 120 : 90)) * this.dpi;
	}

	tick(frame) {
		if (frame % 120 == 0) {
			this.resize();
		}

		let sctx = this.scan.getContext('2d');
		sctx.imageSmoothingEnabled = false;

		sctx.fillStyle = this.bg_color;
		sctx.fillRect(0, 0, this.scan.width, this.scan.height);

		this.logic(frame);
		this.graphics(sctx, frame);
	}

	loadChapter(n) {
		this.message = '';
		this.dialog = null;
		toggle(loading_div, 'on');
		let chap = this.chapters[n];
		chap.init(() => {
			this.game_img = chap.img;
			for (let e of ['gcan', 'entities', 'game_events', 'traps', 'allow_traps', 'message', 'title', 'def_cam']) {
				this[e] = chap[e];
			}

			this.resize();
			toggle(loading_div, 'off');
			this.start_frame = 'ready';
		});
	}

	logic(frame) {
		if (this.dialog) {
			for (let event of this.finger_events) {
				if (event.type == 'tap') {
					this.dialog.end(this);
				}
			}
			this.finger_events.length = 0;
		} else {
			// console.log(this.entities);
			if (this.entities.player && frame - this.start_frame > 100 && this.controls.L != 3 && frame % 30 == 0) {
				if (this.controls.L == 2) {
					if (this.entities.player.stamina > 1) {
						this.entities.player.stamina -= 2;
					} else {
						this.controls.L = 0;
					}
				} else if (this.entities.player.stamina < this.entities.player.max_stamina) {
					this.entities.player.stamina++;
				}
			}

			for (let event of this.finger_events) {
				if (this.controls.L == 3) {
					if (event.type == 'tap') {
						let x = (event.finger.end.x - (this.gcan.width / 2) * this.dpi) / this.scale + this.entities.player.pos.x - 22;
						let y = (event.finger.end.y - (this.gcan.height / 2) * this.dpi) / this.scale + this.entities.player.pos.y + 22;

						let did_something = false;

						for (let ally of this.entities.allies) {
							let t = ally.getTarget();
							if (!ally.event && t.x + 4 < x && x < t.x + 20 && t.y + 4 < y && y < t.y + 20) {
								if (ally.target.obj) {
									ally.target = { x: t.x, y: t.y, obj: null };
								} else {
									ally.target = { x: t.x - this.entities.player.pos.x, y: t.y - this.entities.player.pos.y, obj: this.entities.player };
								}
								did_something = true;
							}
						}

						if (!did_something) {
							this.controls.L++;
						}
					}
				} else if (event.finger.side == 'R' && event.type == 'drag_end' && this.entities.player) {
					if (event.finger.getDist() > 30) {
						if (this.entities.player.getWeapon() == 'bow') {
							if (this.controls.L) {
								this.controls.L = 0;
							} else if (this.entities.player.aiming) {
								let v = event.finger.getVec();
								this.entities.arrows.push(new Arrow(this.entities.player.pos.x + 12, this.entities.player.getFoot(), 7, v.x / 20 / this.dpi, v.y / 20 / this.dpi, 0.3, 3.5, 10, '#51473d', '#cecece'));
								this.entities.player.wood--;
								this.entities.player.stamina -= 2;
							}
						} else if (this.entities.player.getWeapon() == 'axe' && this.entities.player.aiming) {
							let v = event.finger.getVec();
							this.entities.player.axe_attack = { v: v, o: this.entities.player.get_orient(v.x, v.y, true), f: 0 };
							this.entities.player.stamina -= 2;
						} else if (this.entities.player.getWeapon() == 'fence' && this.entities.player.fence_place) {
							let o = this.entities.player.get_orient(this.entities.player.aiming.dx, this.entities.player.aiming.dy, true);
							let pos = this.entities.player.intPos();
							if (o == 0) {
								this.entities.buildings.push(new Fence(pos.x - 7, pos.y + 5, 0, this.game_img));
							}
							if (o == 2) {
								this.entities.buildings.push(new Fence(pos.x + 3, pos.y - 2, 1, this.game_img));
							}
							if (o == 4) {
								this.entities.buildings.push(new Fence(pos.x - 7, pos.y - 8, 0, this.game_img));
							}
							if (o == 6) {
								this.entities.buildings.push(new Fence(pos.x - 13, pos.y - 2, 1, this.game_img));
							}
							if (o % 2 == 0) {
								this.entities.player.wood -= 16;
							}
						} else if (this.entities.player.getWeapon() == 'trap' && this.entities.player.aiming) {
							this.entities.traps.push(new Trap(this.entities.player.pos.x + 4 + this.entities.player.aiming.dx / 4, this.entities.player.pos.y + 4 + this.entities.player.aiming.dy / 4, this.game_img));
							this.entities.player.traps--;
						}
					}
					this.entities.player.aiming = null;
				} else if (event.type == 'tap') {
					for (let button of this.entities.buttons) button.click(this, event.finger.start.x, event.finger.start.y, this.scale, this.scan);

					if (this.controls.L != 2 && this.entities.player) {
						let x = (event.finger.end.x - (this.gcan.width / 2) * this.dpi) / this.scale + this.entities.player.pos.x - 22;
						let y = (event.finger.end.y - (this.gcan.height / 2) * this.dpi) / this.scale + this.entities.player.pos.y + 22;

						let did_something = false;

						for (let ally of this.entities.allies) {
							let t = ally.getTarget();
							if (ally.event && t.x + 4 < x && x < t.x + 20 && t.y + 4 < y && y < t.y + 20) {
								ally.event(this);
								did_something = true;
							}
						}

						if (!did_something) {
							this.controls[event.finger.side]++;
						}
					}
				}
			}
			this.finger_events.length = 0;

			// // // // //

			let L = false,
				R = false;
			let mvx = null,
				mvy = null;
			let lvx = null,
				lvy = null;

			for (let finger of this.fingers) {
				if (finger && this.entities.player) {
					if (finger.getDist() > 30) {
						let v = finger.getVec();

						if (this.controls.L == 3) {
							let x = (finger.end.x - (this.gcan.width / 2) * this.dpi) / this.scale + this.entities.player.pos.x - 22;
							let y = (finger.end.y - (this.gcan.height / 2) * this.dpi) / this.scale + this.entities.player.pos.y + 22;

							if (finger.drag && finger.drag != -1) {
								let t = finger.drag.getTarget();
								finger.drag.target.x += x - t.x - 12;
								finger.drag.target.y += y - t.y - 12;
							} else {
								for (let ally of this.entities.allies) {
									let t = ally.getTarget();
									if (t.x + 4 < x && x < t.x + 20 && t.y + 4 < y && y < t.y + 20) {
										finger.drag = ally;
										break;
									}
									if (!finger.drag) {
										finger.drag = -1;
									}
								}
							}
						} else if (finger.side == 'L' && !L) {
							L = true;
							mvx = v.x / 2 / this.dpi;
							mvy = v.y / 2 / this.dpi;
						} else if (finger.side == 'R' && !R) {
							R = true;
							lvx = v.x / this.dpi;
							lvy = v.y / this.dpi;
						}
					} else if (finger.side == 'R') {
						this.entities.player.aiming = null;
					}
				}
			}

			// // // // //

			if (this.controls.L != 3 && this.entities.player) {
				if (this.controls.L > 3) {
					this.controls.L = 0;
				}
				if (this.controls.R > 1) {
					this.controls.R = 0;
				}

				if (R) {
					if (!this.controls.L) {
						if (this.entities.player.stamina > 1) {
							let w = this.entities.player.getWeapon();
							if ((w == 'bow' && this.entities.player.wood) || w == 'axe' || (w == 'trap' && this.entities.player.traps) || w == 'fence') {
								this.entities.player.aim(lvx, lvy);
							}
						}
						this.entities.player.orient(lvx, lvy);
						if (this.entities.player.getWeapon() == 'fence') {
							this.entities.player.fence_place = this.entities.player.checkFence(this.entities.buildings.concat(this.entities.trees), this.game_img);
						}
					}

					if (this.controls.L == 1) {
						if (this.entities.player.getWeapon() == 'bow' && this.entities.player.wood) {
							this.entities.arrows.push(new Arrow(this.entities.player.pos.x + 12, this.entities.player.getFoot(), 7, lvx / 20, lvy / 20, 0.3, 3.5, 10, '#51473d', '#cecece'));
							this.entities.player.wood--;
							this.controls.L = 2;
						} else {
							this.controls.L = 0;
						}
					}

					if (this.controls.L == 2 && this.entities.arrows.length && !this.entities.arrows[this.entities.arrows.length - 1].stuck) {
						let arr = this.entities.arrows[this.entities.arrows.length - 1];
						let arrmag = Math.sqrt(arr.vel.x * arr.vel.x + arr.vel.y * arr.vel.y);
						arr.vel.x += lvx / 200;
						arr.vel.y += lvy / 200;

						arr.vel.x *= 0.94;
						arr.vel.y *= 0.94;
						arr.vel.z += arrmag / 20;

						if (arr.pos.z > 7) {
							arr.pos.z = 7;
							arr.vel.z = 0;
						}
						this.entities.player.aiming = null;
					}
				} else {
					if (this.controls.L == 1) {
						this.controls.L = 3;
					}
					if (L) {
						this.entities.player.orient(mvx, mvy);
					}
				}

				if (L) {
					if (R) {
						mvx *= 0.5;
						mvy *= 0.5;
					} else if (this.controls.R == 1) {
						this.controls.R = 0;
						if (this.entities.player.stamina >= 6) {
							mvx *= 50;
							mvy *= 50;
							this.entities.player.stamina -= 6;
						}
					}
					this.entities.player.move(mvx, mvy, this.entities.buildings.concat(this.entities.trees), frame);
				} else {
					this.entities.player.walk.state = 0;
					if (this.controls.R == 1) {
						this.entities.player.weapon += 1;
						this.entities.player.weapon %= this.entities.player.weapons.length;
						this.entities.player.weapon_frame = frame;
						this.controls.R = 0;
					}
				}

				this.entities.player.animate(frame);

				if (this.entities.player.axe_attack) {
					this.entities.player.axe_attack.f++;
					if (this.entities.player.axe_attack.f == 2) {
						for (let entity of this.entities.trees.concat(this.entities.buildings)) {
							if (entity.health) {
								let v = this.entities.player.axe_attack.v;
								let pos = this.entities.player.pos;

								for (let i of [0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0]) {
									if (entity.collidePoint(pos.x + 12 + (v.x / 32) * i, pos.y + 18 + (v.y / 32) * i, 1)) {
										entity.health -= 2;
										if (entity.health < 1) {
											let tree = entity instanceof Tree;
											entity.cut();
											let n = (tree ? 8 : 5) + Math.random() * 4;
											while (n > 0) {
												let x = entity.pos.x + (entity instanceof Tree ? 48 : 2) + Math.random() * 28;
												let y = entity.pos.y + (entity instanceof Tree ? 114 : 2) + Math.random() * 28;
												let z = Math.random() * (tree ? 64 : 16);
												let vx = (Math.random() - 0.5) * 0.4;
												let vy = (Math.random() - 0.5) * 0.4;
												let vz = -Math.random();

												// this.entities.arrows.push(new Arrow(x, y, z, vx, vy, 0, 8, 'red', 'red'));
												this.entities.arrows.push(new Arrow(x, y, z, vx, vy, vz, 2 + Math.random() * 3, 12, '#51473d', '#51473d'));
												n--;
											}
										}
										break;
									}
								}
							}
						}
					}
					if (this.entities.player.axe_attack.f == 4) {
						this.entities.player.axe_attack = null;
					}
				}

				// // // // //

				let i = 0;
				while (i < this.entities.arrows.length) {
					this.entities.arrows[i].move(this.entities.buildings.concat(this.entities.trees));

					let dx = this.entities.player.pos.x + 12 - this.entities.arrows[i].pos.x;
					let dy = this.entities.player.getFoot() - this.entities.arrows[i].pos.y;

					if (this.entities.arrows[i].dead) {
						this.entities.arrows.splice(i, 1);
					} else if (this.entities.arrows[i].stuck && dx * dx + dy * dy < 100) {
						this.entities.arrows.splice(i, 1);
						this.entities.player.wood++;
					} else {
						i++;
					}
				}
			}

			for (let part of this.entities.particles) part.move();
			this.entities.particles.filter(part => part.opacity > 0.5);

			for (let infect of this.entities.infected) {
				if (infect.stamina < 10) {
					if (frame % 5 == 0 && Math.random() < 0.5) infect.stamina += 1;
				}

				if (infect.axe_attack) {
					infect.axe_attack.f++;
					if (infect.axe_attack.f == 4) {
						infect.axe_attack = null;
					}
				}

				if (infect.target) {
					let t = infect.getTarget();
					let dx = t.x - infect.pos.x;
					let dy = t.y - infect.pos.y;
					let mag = Math.sqrt(dx * dx + dy * dy);

					if (mag > 50) {
						infect.target = null;
					} else if (mag > 5) {
						infect.orient(dx, dy);
						infect.move((dx / mag) * 12, (dy / mag) * 12, this.entities.buildings.concat(this.entities.trees), frame, this.controls.L == 3);
						infect.animate(frame);
						infect.walk.state = 0;

						if (mag < 10) {
							if (frame % 5 == 0 && infect.stamina == 10 && infect.target instanceof Human && this.entities.particles.length < 64 && Math.random() < 0.2) {
								infect.target.health--;
								infect.stamina = 0;
								infect.axe_attack = { v: { x: dx, y: dy }, o: infect.get_orient(dx, dy, true), f: 0 };

								for (let i = 0; i < Math.random() * 24 + 4; i++) {
									let r = 168 + Math.floor(Math.random() * 168);
									let gb = r / 2 - Math.floor((Math.random() * r) / 2);
									let color = `rgba(${r}, ${gb}, ${gb})`;
									this.entities.particles.push(new Particle(infect.target.pos.x + 12, infect.target.pos.y + 24, 8, dx / 8 + Math.random(), dy / 8 + Math.random(), 0, color, 0.5 + Math.random() / 2));
								}
							}
						}
					}
				} else {
					if (frame % 10 == 0) {
						for (let human of this.entities.allies.concat([this.entities.player])) {
							let dx = human.pos.x - infect.pos.x;
							let dy = human.pos.y - infect.pos.y;
							let mag = Math.sqrt(dx * dx + dy * dy);
							if (mag < 40) infect.target = human;
						}
					}
				}
			}

			for (let trap of this.entities.traps) {
				if (trap.traped) {
					if (frame % 4 == 0) trap.close();
				} else {
					for (let infect of this.entities.infected) {
						let dx = trap.pos.x - 4 - infect.pos.x;
						let dy = trap.pos.y - 7 - infect.pos.y;
						if (Math.abs(dx) < 1 && Math.abs(dy) < 2) {
							trap.traped = true;
							infect.canmove = false;
							break;
						}
					}
				}
			}

			for (let ally of this.entities.allies) {
				let t = ally.getTarget();
				let dx = t.x - ally.pos.x;
				let dy = t.y - ally.pos.y;
				let mag = Math.sqrt(dx * dx + dy * dy);

				if (mag > 0.2) {
					ally.orient(dx, dy);
					ally.move((dx / mag) * 24, (dy / mag) * 24, this.entities.buildings.concat(this.entities.trees), frame, this.controls.L == 3);
					ally.animate(frame);
				} else {
					ally.walk.state = 0;
				}
			}

			if (this.entities.player) {
				for (let sheep of this.entities.sheeps) {
					let dx = sheep.pos.x - this.entities.player.pos.x;
					let dy = sheep.pos.y - this.entities.player.pos.y;
					let mag = Math.sqrt(dx * dx + dy * dy);

					if (mag < 8) {
						sheep.orient(dx, dy);
						sheep.move((dx / mag) * 16, (dy / mag) * 16, this.entities.buildings.concat(this.entities.trees), frame, this.controls.L == 3);
						sheep.animate(frame);
					} else {
						sheep.walk.state = 0;
					}
				}
			}

			for (let event of this.game_events) {
				event.update(this);
			}
		}
	}

	graphics(sctx, frame) {
		let gctx = this.gcan.getContext('2d');
		gctx.imageSmoothingEnabled = false;

		if (this.start_frame == 'ready') {
			console.log('starting');
			this.start_frame = frame;
		}
		gctx.drawImage(this.game_img['water'], 0, 0);
		gctx.drawImage(this.game_img['ground'], 0, 0);

		for (let event of this.game_events) {
			event.draw(gctx, frame);
		}

		this.drawEntities(gctx);

		if (show_hitboxes) {
			this.entities.buildings.concat(this.entities.trees).forEach(build => {
				build.hitbox.draw(gctx, build.pos.x, build.pos.y);
			});
		}

		if (this.controls.L == 3) {
			gctx.fillStyle = 'gray';
			for (let finger of this.fingers) {
				if (finger) {
					let x = (finger.end.x - (this.gcan.width / 2) * this.dpi) / this.scale + this.entities.player.pos.x - 22;
					let y = (finger.end.y - (this.gcan.height / 2) * this.dpi) / this.scale + this.entities.player.pos.y + 22;
					gctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
				}
			}
		}

		gctx.drawImage(this.game_img['tree_calc'], 0, 0);

		if (this.entities.player) {
			sctx.drawImage(this.gcan, (-this.entities.player.pos.x - 12) * this.scale + this.scan.width / 2, (-this.entities.player.pos.y - 12) * this.scale + this.scan.height / 2, this.gcan.width * this.scale, this.gcan.height * this.scale);
		} else {
			sctx.drawImage(this.gcan, this.def_cam.x + this.scan.width / 2, this.def_cam.y + this.scan.height / 2, this.gcan.width * this.scale, this.gcan.height * this.scale);
		}

		if (show_hitboxes) {
			let pos = this.entities.player.pos;
			let hb = this.entities.player.hitbox;
			let sd = hb.getSides(pos.x, pos.y);

			sctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
			sctx.fillRect((sd.L - pos.x - 12) * this.scale + this.scan.width / 2, (sd.T - pos.y - 12) * this.scale + this.scan.height / 2, hb.w * this.scale, hb.l * this.scale);
		}

		for (let button of this.entities.buttons) {
			button.display(sctx, this.scale);
		}

		if (this.dialog) {
			sctx.fillStyle = `rgba(0, 0, 0, 0.8)`;
			sctx.strokeStyle = `white`;
			sctx.lineWidth = this.scale;

			sctx.font = `${12 * this.scale}px Pixelar`;
			sctx.textAlign = 'left';

			let x = this.scan.width / 8;
			let y = (this.scan.height / 5) * 2;

			sctx.fillRect(0, 0, this.scan.width, this.scan.height);

			sctx.drawImage(this.game_img[this.dialog.character], 8, 8, 8, 4, x + this.scale, y - this.scale * 16, 12 * this.scale, 6 * this.scale);

			sctx.fillStyle = `white`;
			sctx.fillText(this.dialog.character, x + this.scale * 16, y - this.scale * 10);

			sctx.beginPath();
			sctx.moveTo(x, y - this.scale * 8);
			sctx.lineTo((this.scan.width / 8) * 7, y - this.scale * 8);
			sctx.stroke();

			sctx.font = `${6 * this.scale}px Pixelar`;
			for (let line of this.dialog.message) {
				sctx.fillStyle = `rgba(0, 0, 0, 0.2)`;
				sctx.fillText(line, x + this.scale / 2, y + this.scale / 2);

				sctx.fillStyle = `white`;
				sctx.fillText(line, x, y);

				y += this.scale * 6;
			}
		} else if (this.entities.player) {
			let i = 20,
				n = this.entities.player.health,
				s = 3;
			while (n) {
				sctx.fillStyle = `rgba(0, 0, 0, 0.2)`;
				sctx.fillRect(i + this.scale, 20 + this.scale, this.scale * s, this.scale * s);
				if (n == 1) {
					sctx.fillStyle = `rgba(128, 48, 48, 0.6)`;
					n--;
				} else {
					sctx.fillStyle = `rgba(192, 64, 64, 1)`;
					sctx.fillStyle = '#cc4444';
					n -= 2;
				}
				sctx.fillRect(i, 20, this.scale * s, this.scale * s);
				i += this.scale * (s + 1);
			}

			sctx.fillStyle = `rgba(0, 0, 0, 0.2)`;
			sctx.fillRect(i + this.scale, 20 + this.scale, this.entities.player.stamina * this.scale, this.scale * 2);
			sctx.fillStyle = `rgba(255, 255, 255, 0.8)`;
			sctx.fillRect(i, 20, this.entities.player.stamina * this.scale, this.scale * 2);

			let opacity = Math.min(1, 1 - (frame - this.start_frame) / 100);

			sctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
			sctx.fillRect(0, 0, this.scan.width, this.scan.height);

			if (this.controls.L != 3) {
				for (let finger of this.fingers) {
					if (finger) {
						if (finger.side == 'L') {
							let vx = this.entities.player.vel.x;
							let vy = this.entities.player.vel.y;
							let mag = Math.min(255, Math.sqrt(vx * vx + vy * vy));

							finger.draw(sctx, `rgba(${Math.floor(255 - mag * 200)}, 255, ${Math.floor(255 - mag * 100)}, ${0.2 + mag / 16})`);
						} else if (this.controls.L == 2) {
							finger.draw(sctx, `rgba(50, 255, 128, 0.4)`);
						} else {
							finger.draw(sctx, `rgba(255, 255, 255, 0.2)`);
						}
					}
				}
			}

			sctx.font = `${6 * this.scale}px Pixelar`;
			sctx.textAlign = 'center';
			let x = this.scan.width / 2;
			let y = this.scan.height - this.scale * 3;

			sctx.fillStyle = `rgba(0, 0, 0, 0.2)`;
			sctx.fillText(this.message, x + this.scale / 2, y + this.scale / 2);

			sctx.fillStyle = `white`;
			sctx.fillText(this.message, x, y);
		}

		for (let obj of this.entities.over) {
			let bw = Math.floor(obj.img.width * this.scale);
			let bh = Math.floor(obj.img.height * this.scale);
			let bx = Math.floor(obj.x * this.scale + scan.width / 2) - bw / 2;
			let by = Math.floor(obj.y * this.scale + scan.height / 2) - bh / 2;
			sctx.drawImage(obj.img, bx, by, bw, bh);
		}
	}

	drawEntities(ctx) {
		let entities = this.entities.arrows.concat(this.entities.buildings).concat(this.entities.trees).concat(this.entities.particles).concat(this.entities.sheeps).concat(this.entities.allies).concat(this.entities.infected).concat(this.entities.traps).concat([this.entities.player]);

		for (let i = 0; i < entities.length - 1; i++) {
			for (let j = i + 1; j < entities.length; j++) {
				if (entities[j] && entities[i] && entities[j].getFoot() < entities[i].getFoot()) {
					let temp = entities[i];
					entities[i] = entities[j];
					entities[j] = temp;
				}
			}
		}

		for (let entity of entities) {
			if (entity instanceof Arrow) {
				entity.draw(ctx, 'shadow');
			} else if (entity) {
				entity.draw(ctx, true);
			}
		}
		for (let entity of entities) {
			if (show_pos) {
				ctx.fillStyle = 'red';
				let { x, y } = entity.pos;
				ctx.fillRect(x, y, 1, 1);
				if (entity instanceof Trap) {
					ctx.fillStyle = 'green';
					ctx.fillRect(x, y, 1, 1);
					ctx.fillStyle = 'blue';
					ctx.fillRect(x - 4, y - 7, 1, 1);
				}
			}

			if (entity instanceof Arrow) {
				entity.draw(ctx, 'normal');
			} else if (entity) {
				if (entity.event) {
					entity.draw(ctx, false, 4);
				}
				entity.draw(ctx);
			}
		}

		if (this.controls.L == 3) {
			ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
			ctx.fillRect(0, 0, this.gcan.width, this.gcan.height);
		} else if (this.entities.player) {
			if (this.entities.player.weapon_frame && this.entities.player.getWeapon() != 'none') {
				ctx.globalAlpha = Math.max(0, (100 - (frame - this.entities.player.weapon_frame)) / 100);
				this.entities.player.draw(ctx, false, 4 + this.entities.player.weapon);
			}
			ctx.globalAlpha = 0.2;
		}

		if (this.entities.player) this.entities.player.draw(ctx);

		for (let ally of this.entities.allies) {
			let pos = this.controls.L == 3 ? ally.getTarget() : null;
			let icon = ally.target.obj ? 2 : 1;
			if (ally.event) {
				icon = 4;
			}

			ally.draw(ctx, false, icon, pos);
			ally.draw(ctx, false, 0, pos);
		}
		ctx.globalAlpha = 1;
	}

	getAlly(name) {
		for (let ally of this.entities.allies) {
			if (ally.name == name) {
				return ally;
			}
		}
	}
}
