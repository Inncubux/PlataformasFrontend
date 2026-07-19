import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <footer class="footer-minimal">
            <div class="footer-left">
                <p class="footer-label">Plataforma Front</p>
                <p class="footer-copy">Panel administrativo para la gestión de empresa, diseño y datos legales.</p>
            </div>
            <p class="footer-meta">Angular 21 · NG-ZORRO · SSR listo</p>
        </footer>
    `,
    styles: [`
        :host {
            display: block;
            padding: 0 32px 24px;
        }

        .footer-minimal {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            padding-top: 24px;
            border-top: 1px solid #e2e8f0;
            color: #64748b;
        }

        .footer-label {
            margin: 0 0 4px;
            font-size: 0.75rem;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            font-weight: 700;
            color: #475569;
        }

        .footer-copy, .footer-meta {
            margin: 0;
            font-size: 0.85rem;
        }

        .footer-meta {
            font-weight: 600;
            color: #94a3b8;
        }

        @media (max-width: 768px) {
            .footer-minimal {
                flex-direction: column;
                align-items: flex-start;
                text-align: left;
            }
        }
    `]
})
export class AppFooterComponent {}