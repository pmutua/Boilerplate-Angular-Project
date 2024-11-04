import { afterNextRender, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SupabaseService } from './core/services/superbase.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title='project'
  constructor(private readonly supabase: SupabaseService) {
    afterNextRender(() => {
      this.supabase.initialize();
    })
  }

  ngOnInit() {}
}
