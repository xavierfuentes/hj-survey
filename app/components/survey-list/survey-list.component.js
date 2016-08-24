import controller from './survey-list.controller';

const surveyListComponent = {
  bindings: {
    surveys: '<surveys',
  },
  template: `
    <div>
      <md-table-container>
        <table md-table>
          <thead md-head>
            <tr md-row>
              <th md-column><span>Name</span></th>
              <th md-column><span>Email</span></th>
              <th md-column><span>Business Name</span></th>
              <th md-column><span>Business Size</span></th>
              <th md-column><span>Address</span></th>
              <th md-column><span>EU Resident</span></th>
              <th md-column><span>Favorite Book</span></th>
              <th md-column><span>Favorite Colors</span></th>
            </tr>
          </thead>
          <tbody md-body>
            <tr md-row md-select="survey" md-select-id="name" md-auto-select ng-repeat="survey in $ctrl.surveys">
              <td md-cell>{{survey.name}}</td>
              <td md-cell>{{survey.email}}</td>
              <td md-cell>{{survey['business.name']}}</td>
              <td md-cell>{{survey['business.size']}}</td>
              <td md-cell>{{survey.address}}</td>
              <td md-cell><input type="checkbox" disabled ng-checked="survey.euresident"></td>
              <td md-cell>{{survey.book}}</td>
              <td md-cell>
                <label>
                  <span>Red</span>
                  <input type="checkbox" disabled ng-checked="survey['color.red']">
                </label>
                <label>
                  <span>Green</span>
                  <input type="checkbox" disabled ng-checked="survey['color.green']">
                </label>
                <label>
                  <span>Blue</span>
                  <input type="checkbox" disabled ng-checked="survey['color.blue']">
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </md-table-container>
    </div>
  `,
  controller,
};

export default surveyListComponent;
