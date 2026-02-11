import { Routes } from '@angular/router';
import { MainLayout } from '../../shared/layout/main-layout/main-layout';
import { Checkin } from './pages/checkin/checkin';
import { CheckinSummaryComponent } from './pages/checkin-summary/checkin-summary';
import { WellnessComponent } from './pages/wellness/wellness';
import { WellnessMeditationComponent } from './pages/wellness/meditation/meditation';
import { WellnessExerciseComponent } from './pages/wellness/exercise/exercise';
import { WellnessRestComponent } from './pages/wellness/rest/rest';
import { WellnessNutritionComponent } from './pages/wellness/nutrition/nutrition';
import { SelfCareComponent } from './pages/self-care/self-care';
import { SelfCareReadingComponent } from './pages/self-care/reading/reading';
import { SelfCareMusicComponent } from './pages/self-care/music/music';
import { SelfCareWalksComponent } from './pages/self-care/walks/walks';
import { SelfCareHygieneComponent } from './pages/self-care/hygiene/hygiene';
import { SelfCareBreaksComponent } from './pages/self-care/breaks/breaks';
import { SelfCareNatureComponent } from './pages/self-care/nature/nature';
import { ProfileComponent } from './pages/profile/profile';
import { SupportComponent } from './pages/support/support';
import { ContactHrComponent } from './pages/support/contact-hr/contact-hr';
import { PsychologicalHelpComponent } from './pages/support/psychological/psychological';
import { WriteFeeingsComponent } from './pages/support/write-feelings/write-feelings';

export const EMPLOYEE_ROUTES: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'checkin', component: Checkin },
      { path: 'checkin-summary', component: CheckinSummaryComponent },
      { path: 'wellness', component: WellnessComponent },
      { path: 'wellness/meditation', component: WellnessMeditationComponent },
      { path: 'wellness/exercise', component: WellnessExerciseComponent },
      { path: 'wellness/rest', component: WellnessRestComponent },
      { path: 'wellness/nutrition', component: WellnessNutritionComponent },
      { path: 'resources', component: SupportComponent },
      { path: 'self-care', component: SelfCareComponent },
      { path: 'self-care/reading', component: SelfCareReadingComponent },
      { path: 'self-care/music', component: SelfCareMusicComponent },
      { path: 'self-care/walks', component: SelfCareWalksComponent },
      { path: 'self-care/hygiene', component: SelfCareHygieneComponent },
      { path: 'self-care/breaks', component: SelfCareBreaksComponent },
      { path: 'self-care/nature', component: SelfCareNatureComponent },
      { path: 'profile', component: ProfileComponent },
      {
        path: 'support',
        children: [
          { path: 'contact-hr', component: ContactHrComponent },
          { path: 'psychological', component: PsychologicalHelpComponent },
          { path: 'write', component: WriteFeeingsComponent },
          { path: '', redirectTo: 'contact-hr', pathMatch: 'full' },
        ],
      },
      { path: '', redirectTo: 'checkin', pathMatch: 'full' },
    ],
  },
];
