import { buildProjectFilters } from './projects.component';
describe('project filter construction',()=>{it('omits empty values and maps featured to boolean',()=>{expect(buildProjectFilters({search:'api',category:'',technology:'FastAPI',featured:'false'})).toEqual({search:'api',technology:'FastAPI',featured:false})})});
