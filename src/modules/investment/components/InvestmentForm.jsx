import React, { useState } from 'react';

const InvestmentForm = ({
  investment,
  onInvestmentChange,
  onGetAnalysis,
  isGeneratingAnalysis
}) => {
  const [newInvestment, setNewInvestment] = useState({ name: '', amount: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onInvestmentChange({
      ...investment,
      [name]: value
    });
  };

  const handleInvestmentInputChange = (e) => {
    const { name, value } = e.target;
    setNewInvestment({
      ...newInvestment,
      [name]: value
    });
  };

  const addInvestment = () => {
    if (newInvestment.name.trim() && newInvestment.amount.trim()) {
      onInvestmentChange({
        ...investment,
        currentInvestments: [
          ...investment.currentInvestments,
          { ...newInvestment }
        ]
      });
      setNewInvestment({ name: '', amount: '' });
    }
  };

  const removeInvestment = (index) => {
    const updatedInvestments = [...investment.currentInvestments];
    updatedInvestments.splice(index, 1);
    onInvestmentChange({
      ...investment,
      currentInvestments: updatedInvestments
    });
  };

  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Investment Strategy</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Strategy Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={investment.name}
            onChange={handleInputChange}
            className="input-field mt-1"
            placeholder="e.g. Retirement Portfolio, College Fund"
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Investment Type
          </label>
          <select
            id="type"
            name="type"
            value={investment.type}
            onChange={handleInputChange}
            className="input-field mt-1"
          >
            <option value="stocks">Stocks</option>
            <option value="bonds">Bonds</option>
            <option value="realEstate">Real Estate</option>
            <option value="crypto">Cryptocurrency</option>
            <option value="mixed">Mixed Portfolio</option>
            <option value="business">Business Venture</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Total Amount to Invest
          </label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={investment.amount}
            onChange={handleInputChange}
            className="input-field mt-1"
            placeholder="$"
          />
        </div>

        <div>
          <label htmlFor="timeHorizon" className="block text-sm font-medium text-gray-700">
            Time Horizon
          </label>
          <select
            id="timeHorizon"
            name="timeHorizon"
            value={investment.timeHorizon}
            onChange={handleInputChange}
            className="input-field mt-1"
          >
            <option value="">Select a time horizon</option>
            <option value="shortTerm">Short-term (0-2 years)</option>
            <option value="mediumTerm">Medium-term (3-5 years)</option>
            <option value="longTerm">Long-term (6-10 years)</option>
            <option value="retirement">Retirement (10+ years)</option>
          </select>
        </div>

        <div>
          <label htmlFor="riskTolerance" className="block text-sm font-medium text-gray-700">
            Risk Tolerance
          </label>
          <select
            id="riskTolerance"
            name="riskTolerance"
            value={investment.riskTolerance}
            onChange={handleInputChange}
            className="input-field mt-1"
          >
            <option value="conservative">Conservative</option>
            <option value="moderatelyConservative">Moderately Conservative</option>
            <option value="moderate">Moderate</option>
            <option value="moderatelyAggressive">Moderately Aggressive</option>
            <option value="aggressive">Aggressive</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current Investments (Optional)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
            <input
              type="text"
              name="name"
              value={newInvestment.name}
              onChange={handleInvestmentInputChange}
              className="input-field col-span-1"
              placeholder="Investment name"
            />
            <div className="flex">
              <input
                type="text"
                name="amount"
                value={newInvestment.amount}
                onChange={handleInvestmentInputChange}
                className="input-field flex-1"
                placeholder="Amount"
              />
              <button
                type="button"
                onClick={addInvestment}
                className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>

          {investment.currentInvestments.length > 0 && (
            <div className="mt-2">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Investment
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {investment.currentInvestments.map((item, index) => (
                    <tr key={index}>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{item.amount}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-right">
                        <button
                          type="button"
                          onClick={() => removeInvestment(index)}
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="goals" className="block text-sm font-medium text-gray-700">
            Investment Goals
          </label>
          <textarea
            id="goals"
            name="goals"
            rows="3"
            value={investment.goals}
            onChange={handleInputChange}
            className="input-field mt-1"
            placeholder="What are you hoping to achieve with this investment?"
          ></textarea>
        </div>

        <div className="pt-4">
          <button
            type="button"
            onClick={onGetAnalysis}
            disabled={isGeneratingAnalysis}
            className="btn-primary w-full"
          >
            {isGeneratingAnalysis ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                Analyzing Investment...
              </div>
            ) : (
              'Get AI Analysis'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestmentForm;