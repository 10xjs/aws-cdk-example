"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetService = void 0;
const core = require("@aws-cdk/core");
const apigateway = require("@aws-cdk/aws-apigateway");
const lambda = require("@aws-cdk/aws-lambda");
const s3 = require("@aws-cdk/aws-s3");
class WidgetService extends core.Construct {
    constructor(scope, id) {
        super(scope, id);
        const bucket = new s3.Bucket(this, 'WidgetService');
        const handler = new lambda.Function(this, 'WidgetHandler', {
            runtime: lambda.Runtime.NODEJS_12_X,
            code: lambda.Code.fromAsset('resources'),
            handler: 'widgets.main',
            environment: {
                BUCKET: bucket.bucketName,
            },
        });
        bucket.grantReadWrite(handler);
        const api = new apigateway.RestApi(this, 'widgets-api', {
            restApiName: 'Widget Service',
        });
        const getWidgetsIntegration = new apigateway.LambdaIntegration(handler, {
            requestTemplates: { 'application/json': '{"statusCode": "200"}' },
        });
        api.root.addMethod('GET', getWidgetsIntegration);
        const widget = api.root.addResource('{id}');
        // Add new widget to bucket with: POST /{id}
        const postWidgetIntegration = new apigateway.LambdaIntegration(handler);
        // Get a specific widget from bucket with: GET /{id}
        const getWidgetIntegration = new apigateway.LambdaIntegration(handler);
        // Remove a specific widget from the bucket with: DELETE /{id}
        const deleteWidgetIntegration = new apigateway.LambdaIntegration(handler);
        widget.addMethod('POST', postWidgetIntegration); // POST /{id}
        widget.addMethod('GET', getWidgetIntegration); // GET /{id}
        widget.addMethod('DELETE', deleteWidgetIntegration); // DELETE /{id}
    }
}
exports.WidgetService = WidgetService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0X3NlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aWRnZXRfc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBc0M7QUFDdEMsc0RBQXNEO0FBQ3RELDhDQUE4QztBQUM5QyxzQ0FBc0M7QUFFdEMsTUFBYSxhQUFjLFNBQVEsSUFBSSxDQUFDLFNBQVM7SUFDL0MsWUFBWSxLQUFxQixFQUFFLEVBQVU7UUFDM0MsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQixNQUFNLE1BQU0sR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBRXBELE1BQU0sT0FBTyxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFO1lBQ3pELE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztZQUN4QyxPQUFPLEVBQUUsY0FBYztZQUN2QixXQUFXLEVBQUU7Z0JBQ1gsTUFBTSxFQUFFLE1BQU0sQ0FBQyxVQUFVO2FBQzFCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUvQixNQUFNLEdBQUcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRTtZQUN0RCxXQUFXLEVBQUUsZ0JBQWdCO1NBQzlCLENBQUMsQ0FBQztRQUVILE1BQU0scUJBQXFCLEdBQUcsSUFBSSxVQUFVLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFO1lBQ3RFLGdCQUFnQixFQUFFLEVBQUMsa0JBQWtCLEVBQUUsdUJBQXVCLEVBQUM7U0FDaEUsQ0FBQyxDQUFDO1FBRUgsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLHFCQUFxQixDQUFDLENBQUM7UUFFakQsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFNUMsNENBQTRDO1FBQzVDLE1BQU0scUJBQXFCLEdBQUcsSUFBSSxVQUFVLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFeEUsb0RBQW9EO1FBQ3BELE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxVQUFVLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFdkUsOERBQThEO1FBQzlELE1BQU0sdUJBQXVCLEdBQUcsSUFBSSxVQUFVLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFMUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUscUJBQXFCLENBQUMsQ0FBQyxDQUFDLGFBQWE7UUFDOUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLFlBQVk7UUFDM0QsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLGVBQWU7SUFDdEUsQ0FBQztDQUNGO0FBMUNELHNDQTBDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNvcmUgZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5pbXBvcnQgKiBhcyBhcGlnYXRld2F5IGZyb20gJ0Bhd3MtY2RrL2F3cy1hcGlnYXRld2F5JztcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdAYXdzLWNkay9hd3MtbGFtYmRhJztcbmltcG9ydCAqIGFzIHMzIGZyb20gJ0Bhd3MtY2RrL2F3cy1zMyc7XG5cbmV4cG9ydCBjbGFzcyBXaWRnZXRTZXJ2aWNlIGV4dGVuZHMgY29yZS5Db25zdHJ1Y3Qge1xuICBjb25zdHJ1Y3RvcihzY29wZTogY29yZS5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4gICAgY29uc3QgYnVja2V0ID0gbmV3IHMzLkJ1Y2tldCh0aGlzLCAnV2lkZ2V0U2VydmljZScpO1xuXG4gICAgY29uc3QgaGFuZGxlciA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgJ1dpZGdldEhhbmRsZXInLCB7XG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTJfWCxcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldCgncmVzb3VyY2VzJyksXG4gICAgICBoYW5kbGVyOiAnd2lkZ2V0cy5tYWluJyxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIEJVQ0tFVDogYnVja2V0LmJ1Y2tldE5hbWUsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgYnVja2V0LmdyYW50UmVhZFdyaXRlKGhhbmRsZXIpO1xuXG4gICAgY29uc3QgYXBpID0gbmV3IGFwaWdhdGV3YXkuUmVzdEFwaSh0aGlzLCAnd2lkZ2V0cy1hcGknLCB7XG4gICAgICByZXN0QXBpTmFtZTogJ1dpZGdldCBTZXJ2aWNlJyxcbiAgICB9KTtcblxuICAgIGNvbnN0IGdldFdpZGdldHNJbnRlZ3JhdGlvbiA9IG5ldyBhcGlnYXRld2F5LkxhbWJkYUludGVncmF0aW9uKGhhbmRsZXIsIHtcbiAgICAgIHJlcXVlc3RUZW1wbGF0ZXM6IHsnYXBwbGljYXRpb24vanNvbic6ICd7XCJzdGF0dXNDb2RlXCI6IFwiMjAwXCJ9J30sXG4gICAgfSk7XG5cbiAgICBhcGkucm9vdC5hZGRNZXRob2QoJ0dFVCcsIGdldFdpZGdldHNJbnRlZ3JhdGlvbik7XG5cbiAgICBjb25zdCB3aWRnZXQgPSBhcGkucm9vdC5hZGRSZXNvdXJjZSgne2lkfScpO1xuXG4gICAgLy8gQWRkIG5ldyB3aWRnZXQgdG8gYnVja2V0IHdpdGg6IFBPU1QgL3tpZH1cbiAgICBjb25zdCBwb3N0V2lkZ2V0SW50ZWdyYXRpb24gPSBuZXcgYXBpZ2F0ZXdheS5MYW1iZGFJbnRlZ3JhdGlvbihoYW5kbGVyKTtcblxuICAgIC8vIEdldCBhIHNwZWNpZmljIHdpZGdldCBmcm9tIGJ1Y2tldCB3aXRoOiBHRVQgL3tpZH1cbiAgICBjb25zdCBnZXRXaWRnZXRJbnRlZ3JhdGlvbiA9IG5ldyBhcGlnYXRld2F5LkxhbWJkYUludGVncmF0aW9uKGhhbmRsZXIpO1xuXG4gICAgLy8gUmVtb3ZlIGEgc3BlY2lmaWMgd2lkZ2V0IGZyb20gdGhlIGJ1Y2tldCB3aXRoOiBERUxFVEUgL3tpZH1cbiAgICBjb25zdCBkZWxldGVXaWRnZXRJbnRlZ3JhdGlvbiA9IG5ldyBhcGlnYXRld2F5LkxhbWJkYUludGVncmF0aW9uKGhhbmRsZXIpO1xuXG4gICAgd2lkZ2V0LmFkZE1ldGhvZCgnUE9TVCcsIHBvc3RXaWRnZXRJbnRlZ3JhdGlvbik7IC8vIFBPU1QgL3tpZH1cbiAgICB3aWRnZXQuYWRkTWV0aG9kKCdHRVQnLCBnZXRXaWRnZXRJbnRlZ3JhdGlvbik7IC8vIEdFVCAve2lkfVxuICAgIHdpZGdldC5hZGRNZXRob2QoJ0RFTEVURScsIGRlbGV0ZVdpZGdldEludGVncmF0aW9uKTsgLy8gREVMRVRFIC97aWR9XG4gIH1cbn1cbiJdfQ==