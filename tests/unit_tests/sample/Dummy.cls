Class sample.Dummy Extends %UnitTest.TestCase
{
    /// Dummy test that always passes (for IPM demonstration)
    Method TestDummy()
    {
        do $$$AssertTrue(1, "Yay the test passed!")
    }
}
