Class REST.Dispatch Extends %pkg.isc.rest.handler
{

ClassMethod AuthenticationStrategy() As %Dictionary.Classname
{
    // Using password authentication for service accounts
    Quit "%pkg.isc.rest.authentication.platformBased"
}

ClassMethod CheckResourcePermitted() As %Boolean
{
    Return 1
}

}
