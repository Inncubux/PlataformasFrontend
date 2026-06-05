import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-footer',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<footer class="footer-shell">
			<div>
				<p class="footer-label">Plataforma Front</p>
				<p class="footer-copy">Panel administrativo para la gestión de empresa, diseño y datos legales.</p>
			</div>

			<p class="footer-meta">Angular 21 · NG-ZORRO · SSR listo</p>
		</footer>
	`,
	styles: [`
		:host {
			display: block;
		}

		.footer-shell {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 16px;
			padding: 18px 22px;
			border-radius: 20px;
			background: #0f172a;
			color: #e2e8f0;
			box-shadow: 0 18px 40px rgba(15, 23, 42, 0.16);
		}

		.footer-label {
			margin: 0 0 6px;
			font-size: 0.78rem;
			letter-spacing: 0.12em;
			text-transform: uppercase;
			color: #93c5fd;
		}

		.footer-copy,
		.footer-meta {
			margin: 0;
			line-height: 1.5;
		}

		.footer-meta {
			font-weight: 700;
			white-space: nowrap;
		}

		@media (max-width: 768px) {
			.footer-shell {
				flex-direction: column;
				align-items: flex-start;
			}
			.footer-meta {
				white-space: normal;
			}
		}
	`]
})
export class AppFooterComponent {}