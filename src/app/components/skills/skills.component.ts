/// <reference path="./skills.d.ts" />

import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FetchService } from '../../services/fetch.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {

  data: Observable<{}>;
  skills: Skills = {};
  skillsGroups: string[] = [];
  filters: SkillsFilter = {
    show: 1,
    level: 0,
    title: 0,
  };

  constructor(private _fetch: FetchService) {
    this.data = this._fetch.getData();

    this._fetch.getSkillsPriority().subscribe((snapshot: string[]) => {
      this.initSkillPriorities(snapshot);
    });

    this._fetch.getSkills().subscribe((snapshot: FetchedSkills) => {
      this.initSkills(snapshot);
      this.sortSkills();
    });
  }

  initSkillPriorities(skillPriorities: string[]): void {
    this.skillsGroups = [];
    skillPriorities.map((item: string) => this.skillsGroups.push(item));
  }

  initSkills(skills: FetchedSkills): void {
    this.skills = {};
    this.skillsGroups.map((group: string) => {
      for(let key in skills) {
        if(skills[key].type === group) {
          if (!this.skills[group]) {
            this.skills[group] = [];
          }
          this.skills[group].push(skills[key]);
        }
      }
    });
  }

  sortSkills(prop: string = 'show', desc: boolean = true) {
    const checkProp = (item: object) => item.hasOwnProperty(prop) ? item[prop] : (desc ? Number.MAX_SAFE_INTEGER : -1);
    for(let group in this.skills){
      this.skills[group].sort((prev: Skill, next: Skill) => {
        return checkProp(prev) < checkProp(next) ? (-1 * (desc ? 1 : -1)) : (1 * (desc ? 1 : -1));
      });
    }
  }

  executeFilter(filter: any) {
    let { key: name, value } = filter;
    this.clearFilters();
    this.filters[name] = value == 1 ? -1 : 1;
    this.sortSkills(name, value == 1);
  }

  clearFilters() {
    for(let key in this.filters) {
      this.filters[key] = 0;
    }
  }

}
