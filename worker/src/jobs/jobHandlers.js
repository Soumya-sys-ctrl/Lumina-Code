const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function processMockAnalysis(job) {
    try {
        const { code, activeTab } = job.data;
        console.log(`[JobHandler] Starting mock analysis for job ${job.id} (Tab: ${activeTab})`);

        await job.updateProgress({ step: 'Initializing AI context model...', progress: 10 });
        console.log(`[JobHandler] Job ${job.id} initialized AI context.`);
        await sleep(800);

        await job.updateProgress({ step: 'Analyzing syntax and architecture...', progress: 30 });
        console.log(`[JobHandler] Job ${job.id} syntax structure analysis complete.`);
        await sleep(1000);

        let thoughts = [];
        let suggestion = '';
        let metrics = {};

        const codeSample = code ? code.toLowerCase() : '';

        // Dynamic Heuristic Simulation based on code context
        if (codeSample.includes('#include') || codeSample.includes('std::') || codeSample.includes('using namespace std') || codeSample.includes('cout')) {
            thoughts = [
                "Detected C++ environment...",
                "Scanning for memory mismanagement patterns...",
                "Warning: Raw pointer manipulation detected without explicit delete protocols.",
                "Identifying potential heap exhaustion vulnerabilities in loop constraints."
            ];
            suggestion = `// C++ Optimization & Security Suggestion
#include <iostream>
#include <memory> 

void processMemory() {
    // [FIX] Instead of raw pointers, use smart pointers to prevent memory leaks automatically
    std::unique_ptr<int> smart_val = std::make_unique<int>(10);
    
    // Memory frees automatically upon exiting scope!
}
`;
            metrics = { security: 55, maintainability: 95, efficiency: 80 };

        } else if (codeSample.includes('function') || codeSample.includes('const ') || codeSample.includes('=>') || codeSample.includes('console.log')) {
             thoughts = [
                "Initiating JavaScript/Node analysis...",
                "Searching for variable scoping and execution errors...",
                "Identified unhandled Promise rejection risks on async calls.",
                "Suggesting try/catch boundaries around external operations."
            ];
            suggestion = `// Javascript Robustness & Modernization Suggestion

// [FIX] Wrap async operations in try/catch to prevent unhandled rejection backend crashes
const fetchUserData = async () => {
    try {
        const response = await fetch('/api/user');
        if (!response.ok) throw new Error('Network error');
        
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Fetch Data Error:", err.message);
        return null; // Safe Fallback 
    }
}
`;
            metrics = { security: 85, maintainability: 90, efficiency: 75 };

        } else if (codeSample.includes('def ') || codeSample.includes('print(') || codeSample.includes('import ') || codeSample.includes('self.')) {
            thoughts = [
                "Loading Python Abstract Syntax Tree...",
                "Checking for OS command injection vectors...",
                "Issue: File operation executed without a context manager. Potential resource leak.",
                "Evaluating time/space bounds on recursive logics..."
            ];
            suggestion = `# Python Best Practices Correction
import os

def handle_user_file(filename):
    # [FIX] Utilizing 'with' block standardizes context management and prevents I/O stalling
    try:
        with open(filename, 'r') as file:
            data = file.readlines()
            # Process data...
        return True
    except FileNotFoundError:
        print("Safely avoiding unhandled IO crash.")
        return False
`;
            metrics = { security: 85, maintainability: 60, efficiency: 65 };

        } else if (codeSample.includes('public class') || codeSample.includes('public static void main') || codeSample.includes('system.out.print')) {
            thoughts = [
                "Loading Java bytecode inspection protocols...",
                "Searching for runtime Null Pointer Exceptions...",
                "Warning: Potential NullPointerException detected on uninitialized object.",
                "Analyzing garbage collection overhead..."
            ];
            suggestion = `// Java Architect Suggestion
import java.util.Optional;

public class Main {
    public static void processUser(User user) {
        // [FIX] Use Optional to prevent NullPointerExceptions safely downstream
        Optional<User> optionalUser = Optional.ofNullable(user);
        
        optionalUser.ifPresent(u -> {
            System.out.println("Processing user: " + u.getName());
        });
    }
}
`;
            metrics = { security: 80, maintainability: 90, efficiency: 70 };

        } else if (codeSample.includes('select ') || codeSample.includes('insert into') || codeSample.includes('where ') || codeSample.includes('update ')) {
            thoughts = [
                "Detecting SQL relational query structures...",
                "Running AST query optimizer...",
                "Warning: Missing indexing or N+1 query vulnerability detected.",
                "Validating against SQL Injection parsing patterns..."
            ];
            suggestion = `-- SQL Optimization & Security Suggestion

-- [FIX 1] Always use parameterized structures in backend code to prevent SQL Injection
-- [FIX 2] Avoid SELECT * when querying large tables to save network overhead

SELECT id, username, email 
FROM users 
WHERE status = 'ACTIVE' 
  AND created_at >= NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;
`;
            metrics = { security: 95, maintainability: 85, efficiency: 95 };

        } else {
            // General structure fallback, default simulation
            thoughts = [
                "Scanning multi-language syntax framework...",
                "Abstracting logic nodes into generic metrics...",
                "Detecting general maintainability smells."
            ];
            suggestion = `// Generic AI Code Standardization Suggestion
// 
// 1. Maintain isolated variable scopes (avoid globals).
// 2. Validate all string inputs before returning them to UI layers to prevent XSS.
// 3. Ensure network calls feature reasonable timeout delays.

function executeOperationSafely() {
   // Verify bounds checking here...
}
`;
            metrics = { security: 90, maintainability: 90, efficiency: 90 };
        }

        console.log(`[JobHandler] Job ${job.id} streaming ${thoughts.length} generated thoughts...`);
        for (let i = 0; i < thoughts.length; i++) {
            await job.updateProgress({
                step: 'Thinking...',
                thoughtChunk: thoughts[i],
                progress: 30 + ((i + 1) * 20)
            });
            console.log(`[JobHandler] Job ${job.id} stream tick ${i + 1}`);
            await sleep(1200);
        }

        await job.updateProgress({ step: 'Finalizing insights...', progress: 95 });
        console.log(`[JobHandler] Job ${job.id} finalizing results.`);
        await sleep(600);

        console.log(`[JobHandler] Job ${job.id} complete. Returning suggestions.`);
        return {
            originalCodeLength: code ? code.length : 0,
            suggestion: suggestion,
            metrics: metrics,
            message: "Analysis success."
        };
    } catch (err) {
        console.error(`[JobHandler] Error during mock analysis inner process for job ${job?.id}:`, err);
        throw err;
    }
}

module.exports = { processMockAnalysis };
