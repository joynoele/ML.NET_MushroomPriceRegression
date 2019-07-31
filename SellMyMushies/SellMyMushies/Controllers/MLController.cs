using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.ML;
using SellMyMushiesML.Model.DataModels;

namespace SellMyMushies.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MLController : ControllerBase
    {
        private const string MODEL_FILEPATH = @"C:\Repo\GMICodeCamp11\SellMyMushies\SellMyMushiesML.Model\MLModel.zip";

        // POST api/<controller>
        [HttpPost]
        public ModelOutput Post([FromBody]ModelInput modelInput)
        {
            // Load the model
            MLContext mlContext = new MLContext();
            ITransformer mlModel = mlContext.Model.Load(MODEL_FILEPATH, out var modelInputSchema);
            var predEngine = mlContext.Model.CreatePredictionEngine<ModelInput, ModelOutput>(mlModel);

            // Try model on sample data
            ModelOutput result = predEngine.Predict(modelInput);

            return result;
        }

    }
}
