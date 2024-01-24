// Module 1: Analyzing the Efficiency of Algorithms

// The time complexity most important and space complexity important also 
// Time will be a function of the input size

// Bubble Sort, Insertion Sort      theta(n^2)
// Merge sort                       theta(nlogn)

// asymptotically as n grows larger

// space complexity: measured as the amount of additional space the algorithm uses in addition 
// to the input size. You need some location in memory.

// if the additional space is a constant irrespective of input size then we say that the 
// algorithm is in-place                any constant is theta(1)

// if the additional space grows with input size

// for merge sort
// 23 12 15 7 8 9 12 7

// 23 12 15 7				8 9 12 7


// 7 12 15 23				7 8 9 12

// 

// merge sort copies into two sub arrays
// the first half goes in the left and the second half in the right
// sort left first separate and sort right second separately
// then merge and overwrite the original content
// we have 2 pointers that moves the position as each position is overwritten
// the pointer chooses between the two positions incrementally 
// if one pointer finishes first the other array just gets copied
// space complexity is going to be n because we need to copy the whole original array


// we will see later that it is actually 2n-1
// a divide and conquer strategy




// for insertion sort
// 23 12 15 7 8 9 12 7
//****&&&&&&&&&&&&&&&&&&

//we have a sorted portion and a unsorted portion
// the sorted portion will expand by one element and the unsorted will shring by one element. 
// 12 and 23 swapped
// 12 23 15 7 8 9 12 7
//******&&&&&&&&&&&&&&&
// the value to e be moved will be stored in a temporary variable
// the right most sorted will be moved to the unsorted region
// a comparison is done and if the next value is bigger  than our temp value then it will 
// overwrite the last value
// if it is smaller than or equal to our temp value then the temp will be copied to the position. 
// The space complexity is 1 because we do all the operations on the original space
// no new space is needed
// we just need one temp holder variable which can be reused

// space-time tradeoff

// heap sort is theta (1) space and theta(nlogn) time
// more involved implementation using a binary tree

// brute force is based on a key


// we need proof of correctness to account for all scenarios

// pseudo code first with logic
// theoretical time and space complexity
// proof of correctness
// implementation
// performance evaluation


// the repeated operation is the basic operation
// logb(n) = log10(n)/log10(b) = ln(n)/ln(2)
// log2(n) = log10(10)/log10(2) = 1 / 0.3010 ~= 3.3

// any constant = theta(1)
// logn >>> constant as n -> inf
// logn <<< n as n -> inf
// nlogn >> n



// f(n) = theta(g(n)) tight bound


// theta = the function in the LHS should grow at the same rate as the function inside
// the theta notation

// only when we cant express as theta do we use big O

// f(n) = O(g(n)) loose bound

// O = function in the LHS should grow either less than or equal to the function inside
// the O notation
// function inside the O notation is big guy growing faster or equal to the function on
// the LHS

// best case = worst case use theta
// best case != worst case use big O

// thus theta(n) generally wont work (in most cases they wont be the same) 
// this is all for time complexity analysis

// 1 2  3 4  5 
// ----------------
// 7 10 5 18 6

/* 
    max = A[0]
    for i = 1 to n-1
        if (A[i] > max) then
            max = A[i]
        end if
    end for
    return max

    Identify the basic operation
    A[i] > max

    even if we were working with 
     1  2  3 4  5 
     ----------------
     70 10 5 18 6

    we still have to go through the entire loop so best case is same as worst case
    it is n which is the array size

    also we can use the same pseudo code algo for finding the minimum

    we do n-1 comparisons
    so theta(n-1) which is theta(n)
*/


/*
    What is relation between theta or O?

    theta implies O

    f(n) = n-1 comparisons = theta(n)   ===> f(n) = O(g(n))

    there reverse is not always true


    we should try to write theta when possible, only when we can will we use omega
    always use the most appropriate notation. 


    if best case = worst case
    use theta notation

    best case - worst case
    5n^3 + 6n + 5 = theta(n^3)

    best case != worst case
    worst case = 5n^3 + 6n + 5 = O(n^4)

    SN: printing is a basic operation and very time consuming

*/




