import express from "express";
import transactionsController from "../controllers/transactionsController";
import budgetsController from "../controllers/budgetsController";
import dashboardController from "../controllers/dashboardController";
import incomeController from "../controllers/incomeController";
import balancesController from "../controllers/balancesController";

const router = express.Router();

router.get("/:userId/dashboard", dashboardController.getUserDashboard);

router.get("/:userId/filters", dashboardController.getUserFilters);

/**
 * @swagger
 * /api/users/{userId}/transactions:
 *   get:
 *     summary: Get all transactions for specified user.
 *     description: Get all transactions for specified user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID to get transactions for
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       '500':
 *         description: Internal server error
 */
router.get("/:userId/transactions", transactionsController.getUserTransactions);

/**
 * @swagger
 * /api/users/{userId}/transactions:
 *   post:
 *      summary: Add new transaction for specified user.
 *      description: Add new transaction for specified user.
 *      parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *            type: string
 *          required: true
 *          description: User ID to add a transaction for
 *      requestBody:
 *        description: Transaction to add for user
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                date:
 *                  type: string
 *                vendor:
 *                  type: string
 *                price:
 *                  type: number
 *                category:
 *                  type: string
 *      responses:
 *        '200':
 *          description: A successful response
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *        '500':
 *          description: Internal server error
 */
router.post("/:userId/transactions", transactionsController.addUserTransaction);

router.put(
  "/:userId/transactions/:transactionId",
  transactionsController.updateUserTransaction
);

router.delete(
  "/:userId/transactions/:transactionId",
  transactionsController.deleteUserTransaction
);

router.get("/:userId/budgets", budgetsController.getUserBudgets);

router.post("/:userId/budgets", budgetsController.addUserBudgets);

router.put("/:userId/budgets/:budgetId", budgetsController.updateUserBudget);

router.delete("/:userId/budgets/:budgetId", budgetsController.deleteUserBudget);

router.get("/:userId/income", incomeController.getUserIncome);

router.post("/:userId/income", incomeController.addUserIncome);

router.put("/:userId/income/:incomeId", incomeController.updateUserIncome);

router.delete("/:userId/income/:incomeId", incomeController.deleteUserIncome);

router.get("/:userId/balances", balancesController.getUserBalances);

router.post("/:userId/balances", balancesController.addUserBalance);

router.put(
  "/:userId/balances/:balanceId",
  balancesController.updateUserBalance
);

router.delete(
  "/:userId/balances/:balanceId",
  balancesController.deleteUserBalance
);

export default router;
